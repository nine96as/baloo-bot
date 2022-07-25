import {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} from "discord.js";
import wait from 'node:timers/promises';

export const data = new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick a member")
    .addUserOption(option => option
        .setName("target")
        .setDescription("user to kick")
        .setRequired(true))
    .addStringOption(option => option
        .setName("reason")
        .setDescription("reason for punishment"))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers)

export async function execute(interaction) {
    const member = interaction.options.getMember("target");
    const reason = interaction.options.getString("reason") || "no reason given";

    if (!member) return interaction.editReply("invalid member");

    try {
        await interaction.guild.members.kick(member, reason);
        const embed = new EmbedBuilder()
            .setTitle(`👋 | ${member.user.tag} has been kicked.`)
            .setColor("Random")
            .setDescription(
                `**reason**: ${reason}`
            )
            .setTimestamp()
        return interaction.editReply({embeds: [embed]});
    } catch (e) {
        if (e) {
            console.log(e);
            return interaction.editReply(`❌ | failed to kick ${member.user.tag}`);
        }
    }
    await wait.setTimeout(5000);
    await interaction.deleteReply();
}