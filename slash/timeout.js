const {SlashCommandBuilder} = require("@discordjs/builders");

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
        .addUserOption((option) => option
            .setName("user")
            .setDescription("user to timeout")
            .setRequired(true))
        .addNumberOption((option) => option
            .setName("duration")
            .setDescription("duration of timeout")
            .setChoices({name: "60 seconds", value: 60 * 1000},
            {name: "5 minutes", value: 5 * 60 * 1000},
            {name: "10 minutes", value: 10 * 60 * 1000},
            {name: "30 minutes", value: 30 * 60 * 1000},
            {name: "1 hour", value: 60 * 60 * 1000},
            {name: "1 day", value: 24 * 60 * 60 * 1000},
            {name: "1 week", value: 7 * 24 * 60 * 60 * 1000},)
            .setRequired(true))
        .addStringOption((option) => option
            .setName("reason")
            .setDescription("reason for punishment")),
    run: async ({client, interaction}) => {
        let member = interaction.options.getUser("user");
        let duration = interaction.options.getNumber("duration");
        let reason = interaction.options.getString("reason") || "no reason given"
    
        if (!member) return interaction.reply("Invalid member");
    
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