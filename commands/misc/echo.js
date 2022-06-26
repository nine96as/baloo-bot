const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("replies with your input")
        .addStringOption(option => option
            .setName("input")
            .setDescription("input to echo back")
            .setRequired(true)),
    async execute(interaction) {
        const message = interaction.options.getString("input");
        await interaction.editReply(`${message}`);
    }
}
