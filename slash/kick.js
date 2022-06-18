const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("kick a member")
        .addUserOption((option) => option
            .setName("user")
            .setDescription("user to kick")
            .setRequired(true))
        .addStringOption((option) => option
            .setName("reason")
            .setDescription("reason for punishment")),
    run: async ({client, interaction}) => {
        let member = interaction.options.getMember("user");
        let reason = interaction.options.getString("reason") || "no reason given"
    
        if (!member) return interaction.reply("invalid member");
    
        try {
            await interaction.guild.members.kick(member, reason);
            return interaction.reply(`${member.user.tag} has been kicked for "${reason}"`);
        } catch (e) {
            if (e) {
                console.log(e);
                return interaction.reply(`failed to kick ${member.user.tag}`)
            }
        }
    }
}