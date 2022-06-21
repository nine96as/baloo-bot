const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("displays info about currently playing song"),
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

        const embed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle("🎶 | now playing")
            .setDescription(`[${queue.nowPlaying().title}](${queue.nowPlaying().url})`)
            .setThumbnail(queue.nowPlaying().thumbnail)
            .addFields(
                {name: "by", value: queue.nowPlaying().author},
                {name: "duration", value: queue.nowPlaying().duration + "s"},
                {name: "requested by", value: `<@${queue.nowPlaying().requestedBy.id}>`},
                {name: "progress", value: queue.createProgressBar({timecodes: true})},
            )

        await interaction.editReply({embeds: [embed]});
    }
}