/* eslint-disable require-jsdoc */
import {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('modal')
    .setDescription('📑 returns a modal');

export async function execute(interaction) {
  const modal = new ModalBuilder()
      .setCustomId('favcolour')
      .setTitle('fav colour?');

  modal.addComponents(
      new ActionRowBuilder().addComponents(
          new TextInputBuilder()
              .setCustomId('favColourInput')
              .setLabel('what is your fav colour?')
              .setRequired(true)
              .setStyle(TextInputStyle.Short),
      ),
  );

  return await interaction.showModal(modal);
}
