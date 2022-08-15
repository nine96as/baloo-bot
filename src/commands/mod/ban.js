import {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('🚨 ban a member')
    .addUserOption((option) =>
        option.setName('target').setDescription('user to ban').setRequired(true)
    )
    .addStringOption((option) =>
        option.setName('reason').setDescription('reason for punishment')
    )
    .setDefaultMemberPermissions(
        PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers
    );

export async function execute(interaction) {
    const member = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') || 'no reason given';

    if (!member) return interaction.reply('invalid member');

    try {
        await interaction.guild.bans.create(member, {
            reason,
        });
        const embed = new EmbedBuilder()
            .setTitle(`🚨 | ${member.user.tag} has been banned.`)
            .setColor('Random')
            .setDescription(`**reason**: ${reason}`)
            .setTimestamp();
        return interaction.reply({ embeds: [embed] });
    } catch (e) {
        if (e) {
            console.log(e);
            return interaction.reply(`❌ | failed to ban ${member.user.tag}`);
        }
    }
}
