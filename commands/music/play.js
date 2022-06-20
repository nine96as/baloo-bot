const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const {QueryType} = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("plays a song")
        .addStringOption(option => option
            .setName("song")
            .setDescription("the song to play")
            .setRequired(true)),
    async execute(interaction) {
        const song = interaction.options.getString("song");

        //checks if user is in a voice channel
        if (!interaction.member.voice.channel) {
            return interaction.editReply("please join a voice channel first!");
        }

        const queue = await interaction.client.player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        })

        //verify vc connection
        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel);
            }
        } catch (e) {
            queue.destroy();
            return interaction.editReply({
                content: "could not join your voice channel!",
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
                content: `nothing was found when searching for: ${result}`,
                ephemeral: true
            })
        }

        const embed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`new ${result.playlist ? "playlist" : "song"} added to queue`)

        //checks if result is a single track or a playlist
        if (!result.playlist) {
            const track = result.tracks[0];
            embed.setThumbnail(track.thumbnail)
            embed.setDescription(`${track.title}`);
        }

        //checks if there is any music being played
        if (!queue.playing) {
            result.playlist
                ? queue.addTracks(result.tracks)
                : queue.play(result.tracks[0])
            return await interaction.editReply({embeds: [embed]});
        } else if (queue.playing) {
            result.playlist
                ? queue.addTracks(result.tracks)
                : queue.addTrack(result.tracks[0])
            return await interaction.editReply({embeds: [embed]});
        }
    }
}