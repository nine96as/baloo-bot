/* eslint-disable require-jsdoc */
import {
  ContextMenuCommandBuilder,
  EmbedBuilder,
  ApplicationCommandType,
} from 'discord.js';

export const data = new ContextMenuCommandBuilder()
    .setName('getBanner')
    .setType(ApplicationCommandType.User);

export async function execute(interaction) {
  const member = interaction.targetMember;

  await member.user.fetch(true);

  const embed = new EmbedBuilder()
      .setColor('Random')
      .setAuthor({
        iconURL: member.user.avatarURL(),
        name: member.user.tag,
      })
      .setImage(member.user.bannerURL({size: 2048, dynamic: true}));

    member.user.bannerURL() ?
      await interaction.reply({
        embeds: [embed],
      }) :
      interaction.reply('❌ | this user doesn\'t have a banner');
}
