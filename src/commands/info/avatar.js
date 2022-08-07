/* eslint-disable require-jsdoc */
import {SlashCommandBuilder, EmbedBuilder} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('🔬 get a user\'s avatar')
    .addUserOption((option) =>
      option
          .setName('target')
          .setDescription('member to fetch the avatar from'),
    );

export async function execute(interaction) {
  const member = interaction.options.getMember('target') || interaction.member;

  const embed = new EmbedBuilder()
      .setColor('Random')
      .setAuthor({
        iconURL: member.user.displayAvatarURL(),
        name: member.user.tag,
      })
      .setImage(member.user.avatarURL({size: 2048, dynamic: true}));

  await interaction.reply({
    embeds: [embed],
  });
}
