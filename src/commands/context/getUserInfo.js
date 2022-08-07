/* eslint-disable require-jsdoc */
import {
  ContextMenuCommandBuilder,
  EmbedBuilder,
  ApplicationCommandType,
  time,
} from 'discord.js';

export const data = new ContextMenuCommandBuilder()
    .setName('getUserInfo')
    .setType(ApplicationCommandType.User);

export async function execute(interaction) {
  const member = interaction.targetMember;

  const embed = new EmbedBuilder()
      .setColor('Random')
      .setAuthor({
        iconURL: member.user.displayAvatarURL(),
        name: member.user.tag,
      })
      .setDescription(`${member.user}`)
      .setFooter({
        text: `ID: ${member.user.id}`,
      })
      .setTimestamp()
      .setThumbnail(
          member.user.avatarURL({size: 2048, dynamic: true}),
      )
      .addFields(
          {
            name: 'joined',
            value: `${time(member.joinedAt)} ` +
            `(${time(member.joinedAt, 'R')})`,
          },
          {
            name: 'registered',
            value: `${time(member.user.createdAt)} ` +
            `(${time(member.user.createdAt, 'R')})`,
          },
          {
            name: `roles (${member.roles.cache.size})`,
            value: `${
              member.roles.cache
                  .map((r) => r)
                  .join(' ')
                  .replace('@everyone', '') || 'none'
            }`,
          },
          {
            name: 'permissions',
            value: `${
              member.permissions
                  .toArray()
                  .map((p) => p.toLowerCase())
                  .join(', ')
                  .replaceAll('_', ' ') || 'none'
            }`,
          },
      );

  await interaction.reply({
    embeds: [embed],
  });
}
