const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("replies with server info"),
    async execute(interaction) {
        await interaction.reply(`server name: ${interaction.guild.name}\ntotal members: ${interaction.guild.memberCount}\ncreated at: ${interaction.guild.createdAt}`);
    }
}