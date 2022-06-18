const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("songinfo")
        .setDescription("displays info about the currently playing song"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue) {
            return await interaction.editReply("there are no songs in the queue");
        }

        let bar = queue.createProgressBar({
            queue: false,
            length: 19
        })

        const song = queue.current

        await interaction.editReply({
            embeds: [new MessageEmbed()
                .setThumbnail(song.thumbnail)]
                .setDescription(`currently playing [${song.title}](${song.URL})\n\n` + bar)
        })
    }
}