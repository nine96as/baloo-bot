const {SlashCommandBuilder} = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("replies with pong twice!"),
    async execute(interaction, client) {
        const msg = interaction.deferReply({})
        await interaction.editReply("🏓 | pong!");
        await wait(2000);
		await interaction.editReply("🏓 | pong again!");
    }
}