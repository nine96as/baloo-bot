/* eslint-disable require-jsdoc */
import {SlashCommandBuilder} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('dice')
    .setDescription(
        '🎲 chooses random number from min/max given (1/6 by default)',
    )
    .addNumberOption((option) =>
      option.setName('min').setDescription('min value'),
    )
    .addNumberOption((option) =>
      option.setName('max').setDescription('max value'),
    );

export async function execute(interaction) {
  const min = interaction.options.getNumber('min') || 1;
  const max = interaction.options.getNumber('max') || 6;
  interaction.reply(
      `🎲 | rolled ${Math.floor(Math.random() * max) + min}!`,
  );
}
