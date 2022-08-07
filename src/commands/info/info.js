/* eslint-disable require-jsdoc */
import {SlashCommandBuilder, EmbedBuilder, time} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('🔬 get info about a user or server')
    .addSubcommand((subcommand) =>
      subcommand
          .setName('user')
          .setDescription('🔬 info about a user')
          .addUserOption((option) =>
            option.setName('target').setDescription('the user'),
          ),
    )
    .addSubcommand((subcommand) =>
      subcommand
          .setName('server')
          .setDescription('🔬 info about the server'),
    );

export async function execute(interaction) {
  if (interaction.commandName === 'info') {
    if (interaction.options.getSubcommand() === 'user') {
      const member =
        interaction.options.getMember('target') || interaction.member;

      const embed = new EmbedBuilder()
          .setColor(
            member.user.displayHexColor === '#000000' ? '#ffffff' :
              member.displayHexColor,
          )
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
    } else if (interaction.options.getSubcommand() === 'server') {
      const guild = interaction.guild;

      const embed = new EmbedBuilder()
          .setColor('Random')
          .setAuthor({
            name: guild.name,
            iconURL: guild.iconURL(),
          })
          .setThumbnail(guild.iconURL({size: 2048}))
          .setFooter({
            text: `ID: ${guild.id}`,
          })
          .setTimestamp()
          .addFields(
              {name: 'owner', value: `<@${guild.ownerId}>`},
              {
                name: 'total members',
                value: `${guild.memberCount}`,
              },
              {
                name: 'total roles',
                value: `${guild.roles.cache.size}`,
              },
              {
                name: 'total channels',
                value: `${guild.channels.cache.size}`,
              },
              {
                name: 'text channels',
                value: `${
                  guild.channels.cache.filter(
                      (c) => c.type === 'GUILD_TEXT',
                  ).size
                }`,
              },
              {
                name: 'voice channels',
                value: `${
                  guild.channels.cache.filter(
                      (c) => c.type === 'GUILD_VOICE',
                  ).size
                }`,
              },
              {
                name: 'role list',
                value: `${
                  guild.roles.cache.map((r) => r).join(' ') ||
                  'none'
                }`,
              },
              {
                name: 'created at',
                value: `${time(guild.createdAt)} ` +
                `(${time(guild.createdAt, 'R')})`,
              },
          );

      await interaction.reply({
        embeds: [embed],
      });
    }
  }
}
