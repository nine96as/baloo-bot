const {SlashCommandBuilder} = require("@discordjs/builders");
const {PermissionFlagsBits} = require('discord-api-types/v10');
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
    
        if (!member) return interaction.reply("invalid member");
    
        try {
            await interaction.guild.bans.create(member, {
                reason
            })
            return interaction.reply(`${member.user.tag} has been kicked for "${reason}"`);
        } catch (e) {
            if (e) {
                console.log(e);
                return interaction.reply(`failed to kick ${member.user.tag}`);
            }
        }
        await wait(5000);
        await interaction.deleteReply();
    }
}