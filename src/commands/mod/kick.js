const {SlashCommandBuilder} = require("@discordjs/builders");
const {PermissionFlagsBits} = require('discord-api-types/v10');
const {MessageEmbed} = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("kick a member")
        .addUserOption(option => option
            .setName("target")
            .setDescription("user to kick")
            .setRequired(true))
        .addStringOption(option => option
            .setName("reason")
            .setDescription("reason for punishment"))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const member = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason") || "no reason given";
    
        if (!member) return interaction.editReply("invalid member");
    
        try {
            await interaction.guild.members.kick(member, reason);
            const embed = new MessageEmbed()
                .setTitle(`👋 | ${member.user.tag} has been kicked.`)
                .setColor(`RANDOM`)
                .setDescription(
                    `**reason**: ${reason}`
                )
                .setTimestamp()
            return interaction.editReply({embeds: [embed]});
        } catch (e) {
            if (e) {
                console.log(e);
                return interaction.editReply(`failed to kick ${member.user.tag}`);
            }
        }
        await wait(5000);
        await interaction.deleteReply();
    }
}