const {SlashCommandBuilder} = require("@discordjs/builders");
const {PermissionFlagsBits} = require('discord-api-types/v10');

const durations = [
    {name: "60 seconds", value: 60 * 1000},
    {name: "5 minutes", value: 5 * 60 * 1000},
    {name: "10 minutes", value: 10 * 60 * 1000},
    {name: "30 minutes", value: 30 * 60 * 1000},
    {name: "1 hour", value: 60 * 60 * 1000},
    {name: "1 day", value: 24 * 60 * 60 * 1000},
    {name: "1 week", value: 7 * 24 * 60 * 60 * 1000},
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("timeout a member")
        .addUserOption(option => option
            .setName("target")
            .setDescription("user to timeout")
            .setRequired(true))
        .addNumberOption(option => option
            .setName("duration")
            .setDescription("duration of timeout")
            .addChoices(
                {name: "60 seconds", value: 60 * 1000},
                {name: "5 minutes", value: 5 * 60 * 1000},
                {name: "10 minutes", value: 10 * 60 * 1000},
                {name: "30 minutes", value: 30 * 60 * 1000},
                {name: "1 hour", value: 60 * 60 * 1000},
                {name: "1 day", value: 24 * 60 * 60 * 1000},
                {name: "1 week", value: 7 * 24 * 60 * 60 * 1000},
            )
            .setRequired(true))
        .addStringOption(option => option
            .setName("reason")
            .setDescription("reason for punishment"))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const member = interaction.options.getMember("target");
        const duration = interaction.options.getNumber("duration");
        const reason = interaction.options.getString("reason") || "no reason given"
    
        if (!member) return interaction.reply("invalid member");
    
        try {
            await member.timeout(duration, reason);
            return interaction.reply(`${member.user.tag} has been timed out for ${durations.find(d => duration === d.value)?.name} with a reason of "${reason}"`);
        } catch (e) {
            if (e) {
                console.log(e);
                return interaction.reply(`failed to timeout ${member.user.tag}`)
            }
        }
    }
}