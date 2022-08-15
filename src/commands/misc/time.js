import { SlashCommandBuilder, time } from 'discord.js';
const date = new Date();

export const data = new SlashCommandBuilder()
    .setName('time')
    .setDescription('shows bot uptime');

export async function execute(interaction) {
    const timeString = time(date);
    const relative = time(date, 'R');
    interaction.reply(`relative: ${relative}` + `\ntime: ${timeString}`);
}
