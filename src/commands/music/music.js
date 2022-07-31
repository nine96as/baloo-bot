import {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";
import {QueryType, QueueRepeatMode} from "discord-player";
import finder from "lyrics-finder";

export const data = new SlashCommandBuilder()
    .setName("music")
    .setDescription("🎶 carry out various music operations")
    .addSubcommand(subcommand => subcommand
        .setName("play")
        .setDescription("▶️ plays a song/playlist")
        .addStringOption(option => option
            .setName("song")
            .setDescription("the song to play")
            .setRequired(true)))
    .addSubcommand(subcommand => subcommand
        .setName("pause")
        .setDescription("⏸️ pauses music"))
    .addSubcommand(subcommand => subcommand
        .setName("resume")
        .setDescription("resumes music"))
    .addSubcommand(subcommand => subcommand
        .setName("queue")
        .setDescription("📄 displays song queue")
        .addNumberOption(option => option
            .setName("page")
            .setDescription("page number of queue")
            .setMinValue(1)))
    .addSubcommand(subcommand => subcommand
        .setName("skip")
        .setDescription("⏭️ skips current song"))
    .addSubcommand(subcommand => subcommand
        .setName("rewind")
        .setDescription("⏮️ rewinds to previous song"))
    .addSubcommand(subcommand => subcommand
        .setName("stop")
        .setDescription("⏹️ stops all music and clears queue"))
    .addSubcommand(subcommand => subcommand
        .setName("volume")
        .setDescription("🔊 check or set volume")
        .addIntegerOption(option => option
            .setName("level")
            .setDescription("volume level to be set (1-100)")))
    .addSubcommand(subcommand => subcommand
        .setName("loop")
        .setDescription("🔁 set loop modes")
        .addStringOption(option => option
            .setName("mode")
            .setDescription("loop mode to be set")
            .addChoices(
                {name: "off", value: "off"},
                {name: "queue", value: "queue"},
                {name: "track", value: "track"},
            )
            .setRequired(true)))
    .addSubcommand(subcommand => subcommand
        .setName("shuffle")
        .setDescription("🔀 shuffles current queue"))
    .addSubcommand(subcommand => subcommand
        .setName("nowplaying")
        .setDescription("🎶 displays info about currently playing song"))
    .addSubcommand(subcommand => subcommand
        .setName("clearqueue")
        .setDescription("🧼 clears queue"))
    .addSubcommand(subcommand => subcommand
        .setName("lyrics")
        .setDescription("📜 fetch lyrics of currently playing song"))

export async function execute(interaction) {
    if (interaction.commandName === "music") {
        try {
            if (interaction.options.getSubcommand() === "play") {
                const song = interaction.options.getString("song");

                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("please join a voice channel first!");
                }
        
                const queue = await interaction.client.player.createQueue(interaction.guild, {
                    metadata: {
                        channel: interaction.channel
                    }
                })
        
                //verify vc connection
                try {
                    if (!queue.connection) {
                        await queue.connect(interaction.member.voice.channel);
                    }
                } catch (e) {
                    queue.destroy();
                    return interaction.editReply({
                        content: "❌ | could not join your voice channel!",
                        ephemeral: true
                    })
                }
        
                const result = await interaction.client.player.search(song, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO,
                })
        
                //checks if result was successfully fetched
                if (!result || !result.tracks.length) {
                    return interaction.editReply({
                        content: `❌ | nothing was found when searching for: ${result}`,
                        ephemeral: true
                    })
                }
        
                const embed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`▶️ | new ${result.playlist ? "playlist" : "song"} added to queue`)
        
                //checks if result is a single track or a playlist
                if (!result.playlist) {
                    const track = result.tracks[0];
                    embed.setThumbnail(track.thumbnail)
                    embed.setDescription(`**[${track.title}](${track.url})**`);
                    embed.setFooter({text: `duration: ${track.duration}`})
                }
                
                result.playlist
                    ? queue.addTracks(result.tracks)
                    : queue.addTrack(result.tracks[0])
                
                await interaction.editReply({embeds: [embed]});

                if (!queue.playing) await queue.play();
            } else if (interaction.options.getSubcommand() === "pause") {
                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("❌ | please join a voice channel first!");
                }
                    
                const queue = interaction.client.player.getQueue(interaction.guildId);
            
                //checks if queue is empty
                if (!queue) {
                    return await interaction.editReply("❌ | there are no songs in the queue");
                }
            
                queue.setPaused(true);

                await interaction.editReply("⏸️ | music has been paused!");
            } else if (interaction.options.getSubcommand() === "resume") {
                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("❌ | please join a voice channel first!");
                }
                    
                const queue = interaction.client.player.getQueue(interaction.guildId);
            
                //checks if queue is empty
                if (!queue) {
                    return await interaction.editReply("❌ | there are no songs in the queue");
                }
            
                queue.setPaused(false);
            
                await interaction.editReply("▶️ | music has been resumed!");
            } else if (interaction.options.getSubcommand() === "queue") {
                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("❌ | please join a voice channel first!");
                }
                    
                const queue = interaction.client.player.getQueue(interaction.guildId);
            
                //checks if queue is empty
                if (!queue) {
                    return await interaction.editReply("❌ | there are no songs in the queue");
                }
            
                const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
                const page = (interaction.options.getNumber("page") || 1) - 1;
            
                //checks if inputted page num exceeds total page number
                if (page > totalPages) {
                    return interaction.editReply(
                        `❌ | page provided invalid; there are only ${totalPages} pages of songs`
                        )
                }
            
                const currentTrack = queue.current;
                const tracks = queue.tracks.slice(page * 10, page * 10 + 10).map((track, i) => {
                    return `**${page * 10 + i + 1}.** \`[${track.duration}]\` [${track.title}](${track.url})`;
                }).join("\n");
            
                const embed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`queue for ${interaction.guild.name}`)
                    .setDescription(
                        `**🎶 | now playing**\n` + 
                        (currentTrack
                            ? `\`[${currentTrack.duration}]\` [${currentTrack.title}](${currentTrack.url})`
                            : "none") +
                        `\n\n**🗒️ | queue**\n${tracks}`
                    )
                    .setFooter({
                        text: `page ${page + 1} of ${totalPages}`
                    })
                    .setThumbnail(currentTrack.thumbnail)
                
                const components = [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId("rewind")
                            .setLabel("⏮️")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId("skip")
                            .setLabel("⏭️")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId("stop")
                            .setLabel("⏹️")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId("loopqueue")
                            .setLabel("🔁")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId("shuffle")
                            .setLabel("🔀")
                            .setStyle(ButtonStyle.Primary),
                    )
                ]
                    
                return interaction.editReply({embeds: [embed], components});
            } else if (interaction.options.getSubcommand() === "skip") {
                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("❌ | please join a voice channel first!");
                }

                const queue = interaction.client.player.getQueue(interaction.guildId);

                //checks if there is anything playing
                if (!queue || !queue.playing) {
                    return interaction.editReply("❌ | no music is being played in this guild");
                }

                const embed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`⏭️ | song skipped`)
                    .setDescription(`**[${queue.nowPlaying().title}](${queue.nowPlaying().url})**`)
                    .setThumbnail(queue.nowPlaying().thumbnail)

                queue.skip();

                await interaction.editReply({embeds: [embed]});
            } else if (interaction.options.getSubcommand() === "stop") {
                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("❌ | please join a voice channel first!");
                }

                const queue = interaction.client.player.getQueue(interaction.guildId);

                //checks if there is anything playing
                if (!queue || !queue.playing) {
                    return interaction.editReply("❌ | no music is being played in this guild");
                }

                queue.destroy();

                await interaction.editReply("⏹️ | cya!");
            } else if (interaction.options.getSubcommand() === "volume") {
                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("❌ | please join a voice channel first!");
                }

                const queue = interaction.client.player.getQueue(interaction.guildId);

                //checks if there is anything playing
                if (!queue || !queue.playing) {
                    return interaction.editReply("❌ | no music is being played in this guild");
                }

                const volume = interaction.options.getInteger("level");

                if (!volume) {
                    return interaction.editReply(`🔊 | volume: ${queue.volume}`);
                } else if (volume.value < 0 || volume.value > 100) {
                    interaction.editReply("❌ | volume must be within 1-100");
                }
        
                const v = await queue.setVolume(volume);
                return interaction.editReply(
                    v 
                        ? `🔊 | volume set to ${volume}`
                        : `❌ | volume change failed!`
                )
            } else if (interaction.options.getSubcommand() === "loop") {
                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("❌ | please join a voice channel first!");
                }

                const queue = interaction.client.player.getQueue(interaction.guildId);

                //checks if there is anything playing
                if (!queue || !queue.playing) {
                    return interaction.editReply("❌ | no music is being played in this guild");
                }

                const mode = interaction.options.getString("mode");

                if (mode === "off") {
                    const x  = await queue.setRepeatMode(QueueRepeatMode.OFF);
                    return await interaction.editReply(
                        x
                            ? `🔁 | looping ${mode}!`
                            : `❌ | loop mode change failed`
                    )
                } else if (mode === "queue") {
                    const x  = await queue.setRepeatMode(QueueRepeatMode.QUEUE);
                    return await interaction.editReply(
                        x
                            ? `🔁 | looping ${mode}!`
                            : `❌ | loop mode change failed`
                    )
                } else if (mode === "track") {
                    const x  = await queue.setRepeatMode(QueueRepeatMode.TRACK);
                    return await interaction.editReply(
                        x
                            ? `🔁 | looping ${mode}!`
                            : `❌ | loop mode change failed`
                    )
                }
            } else if (interaction.options.getSubcommand() === "shuffle") {
                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("❌ | please join a voice channel first!");
                }
        
                const queue = interaction.client.player.getQueue(interaction.guildId);

                //checks if queue is empty
                if (!queue) {
                    return await interaction.editReply("❌ | there are no songs in the queue");
                }

                queue.shuffle();

                await interaction.editReply("🔀 | queue has been shuffled!");
            } else if (interaction.options.getSubcommand() === "nowplaying") {
                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("❌ | please join a voice channel first!");
                }

                const queue = interaction.client.player.getQueue(interaction.guildId);

                //checks if there is anything playing
                if (!queue || !queue.playing) {
                    return interaction.editReply("❌ | no music is being played in this guild");
                }

                const embed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("🎶 | now playing")
                    .setDescription(`[${queue.nowPlaying().title}](${queue.nowPlaying().url})`)
                    .setThumbnail(queue.nowPlaying().thumbnail)
                    .addFields(
                        {name: "by", value: queue.nowPlaying().author},
                        {name: "duration", value: queue.nowPlaying().duration + "s"},
                        {name: "requested by", value: `<@${queue.nowPlaying().requestedBy.id}>`},
                        {name: "progress", value: queue.createProgressBar({timecodes: true})},
                    )
                
                const components = [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId("rewind")
                            .setLabel("⏮️")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId("skip")
                            .setLabel("⏭️")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId("stop")
                            .setLabel("⏹️")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId("looptrack")
                            .setLabel("🔁")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId("shuffle")
                            .setLabel("🔀")
                            .setStyle(ButtonStyle.Primary),
                    )
                ]
                    
                return interaction.editReply({embeds: [embed], components});
            } else if (interaction.options.getSubcommand() === "clearqueue") {
                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("❌ | please join a voice channel first!");
                }

                const queue = interaction.client.player.getQueue(interaction.guildId);

                //checks if there is anything playing
                if (!queue || !queue.playing) {
                    return interaction.editReply("❌ | no music is being played in this guild");
                }

                queue.clear();

                await interaction.editReply("🧼 | successfully cleared queue!");
            } else if (interaction.options.getSubcommand() === "lyrics") {
                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("please join a voice channel first!");
                }

                const queue = interaction.client.player.getQueue(interaction.guildId);

                //checks if there is anything playing
                if (!queue || !queue.playing) {
                    return interaction.editReply("no music is being played in this guild");
                }

                const track = queue.nowPlaying();
                let lyrics = null;

                //lyric finder
                try {
                    lyrics = await finder(track.title, "");
                    if (!lyrics) lyrics = `no lyrics found.`;
                } catch (e) {
                    lyrics = `no lyrics found.`
                }

                let embed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`lyrics for ${track.title}\n(${track.url})`)
                    .setDescription(lyrics)
                    .setThumbnail(`${track.thumbnail}`)

                //checks if character count exceeds limit for a discord message
                if (embed.description.length >= 4096) {
                    embed.description = `${embed.description.substr(
                        0,
                        4095
                    )}...`
                }

                return interaction.editReply({embeds: [embed]})
            } else if (interaction.options.getSubcommand() === "rewind") {
                //checks if user is in a voice channel
                if (!interaction.member.voice.channel) {
                    return interaction.editReply("❌ | please join a voice channel first!");
                }
        
                const queue = interaction.client.player.getQueue(interaction.guildId);

                //checks if queue is empty
                if (!queue) {
                    return await interaction.editReply("❌ | there are no songs in the queue");
                }

                if (queue.previousTracks.length > 1) {
                    const rewind = queue.back();
                    return await interaction.editReply(
                        rewind
                            ? "⏮️ | rewinded to previous track!"
                            : "❌ | failed to rewind to previous track"
                    )
                } else {
                    return interaction.editReply({
                        content: "❌ | no previous track to rewind to",
                        ephemeral: true
                    })
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}
