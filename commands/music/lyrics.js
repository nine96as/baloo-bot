const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const fetch = require("node-fetch");
const finder = require("lyrics-finder");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("fetch lyrics of currently playing song"),
    async execute(interaction) {
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

        let embed = new MessageEmbed()
            .setColor(`RANDOM`)
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
    }
}