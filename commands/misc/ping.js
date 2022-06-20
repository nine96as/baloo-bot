const {SlashCommandBuilder} = require("@discordjs/builders");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("replies with pong twice!"),
    async execute(interaction) {
        await interaction.editReply("pong!");
        await wait(2000);
		await interaction.editReply('pong again!');
    }
}