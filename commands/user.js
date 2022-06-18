const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("replies with user info"),
    async execute(interaction) {
        await interaction.reply(`your tag: ${interaction.user.tag}\nyour id: ${interaction.user.id}`);
    }
}