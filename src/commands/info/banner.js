/* eslint-disable require-jsdoc */
import {SlashCommandBuilder, EmbedBuilder} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('banner')
    .setDescription('🔬 get a user\'s banner')
    .addUserOption((option) =>
      option
          .setName('target')
          .setDescription('member to fetch the banner from'),
    );

export async function execute(interaction) {
  const member = interaction.options.getMember('target') || interaction.member;

  await member.user.fetch(true);

  const embed = new EmbedBuilder()
      .setColor('Random')
      .setAuthor({iconURL: member.user.avatarURL(), name: member.user.tag})
      .setImage(member.user.bannerURL({size: 2048}));

  await interaction.reply({
    embeds: [embed],
  });
}
