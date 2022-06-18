const {SlashCommandBuilder} = require("@discordjs/builders");
const {PermissionFlagsBits} = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("ban a member")
        .addUserOption(option => option
            .setName("target")
            .setDescription("user to ban")
            .setRequired(true))
        .addStringOption(option => option
            .setName("reason")
            .setDescription("reason for punishment"))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const member = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason") || "no reason given";
    
        if (!member) return interaction.reply("invalid member");
    
        try {
            await interaction.guild.bans.create(member, {
                reason
            })
            return interaction.reply(`${member.user.tag} has been banned for "${reason}"`);
        } catch (e) {
            if (e) {
                console.log(e);
                return interaction.reply(`failed to ban ${member.user.tag}`);
            }
        }
    }
}