/* eslint-disable require-jsdoc */
import {SlashCommandBuilder, time} from 'discord.js';
const date = new Date();

export const data = new SlashCommandBuilder()
    .setName('time')
    .setDescription('shows the time');

export async function execute(interaction) {
  const timeString = time(date);
  const relative = time(date, 'R');
  interaction.reply(
    `relative: ${relative}` +
    `\ntime: ${timeString}`
    );
}
