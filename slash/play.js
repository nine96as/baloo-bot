const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const {QueryType} = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("loads songs from yt")
        .addSubcommand((subcommand) => subcommand
            .setName("song")
            .setDescription("loads a single song from a url")
            .addStringOption((option) => option
                .setName("url")
                .setDescription("url of the song")
                .setRequired(true))
        )
        .addSubcommand((subcommand) => subcommand
            .setName("playlist")
            .setDescription("loads a playlist of songs from a url")
            .addStringOption((option) => option
                .setName("url")
                .setDescription("url of the playlist")
                .setRequired(true))
        )
        .addSubcommand((subcommand) => subcommand
            .setName("search")
            .setDescription("searches for a song based on provided keywords")
            .addStringOption((option) => option
                .setName("keywords")
                .setDescription("search keywords")
                .setRequired(true))
        ),
    run: async ({client, interaction}) => {
        //checks whether server member is in a voice channel
        if (!interaction.member.voice.channel) {
            return interaction.editReply("you need to be in a VC to use this command");
        }

        const queue = await client.player.createQueue(interaction.guild);
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);

        let embed = new MessageEmbed();

        if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url");
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
                
            //checks if anything has been found
            if (result.tracks.length === 0) {
                return interaction.editReply("no results");
            }

            const song = result.tracks[0];
            await queue.addTrack(song);
            embed
                .setDescription(`**[${song.title}](${song.url})** has beed added to the queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({text: `duration: ${song.duration}`})

        } else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url");
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })
                
            //checks if anything has been found
            if (result.tracks.length === 0) {
                return interaction.editReply("no results");
            }

            const playlist = result.playlist;
            await queue.addTrack(result.tracks);
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** has beed added to the queue`)
                .setThumbnail(playlist.thumbnail)
                .setFooter({text: `duration: ${playlist.duration}`})

        } else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("url");
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
                
            //checks if anything has been found
            if (result.tracks.length === 0) {
                return interaction.editReply("no results");
            }

            const song = result.tracks[0];
            await queue.addTrack(song);
            embed
                .setDescription(`**[${song.title}](${song.url})** has beed added to the queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({text: `duration: ${song.duration}`})
        }
        if(!queue.playing) await queue.play();
        await interaction.editReply({
            embeds: [embed]
        })
    }   
}