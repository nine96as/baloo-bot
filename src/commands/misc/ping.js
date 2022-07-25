import {SlashCommandBuilder} from "discord.js";
import wait from 'node:timers/promises';

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("replies with pong twice!")

export async function execute(interaction, client) {
    await interaction.editReply("🏓 | pong!");
    await wait.setTimeout(2000);
    await interaction.editReply("🏓 | pong again!");
}
