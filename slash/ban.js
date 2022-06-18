const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("ban a member")
        .addUserOption((option) => option
            .setName("user")
            .setDescription("user to ban")
            .setRequired(true))
        .addStringOption((option) => option
            .setName("reason")
            .setDescription("reason for punishment")),
    run: async ({client, interaction}) => {
        let member = interaction.options.getMember("user");
        let reason = interaction.options.getString("reason") || "no reason given"
    
        if (!member) return interaction.reply("invalid member");
    
        try {
            await interaction.guild.bans.create(member, {
                reason
            })
            return interaction.reply(`${member.user.tag} has been banned for "${reason}"`);
        } catch (e) {
            if (e) {
                console.log(e);
                return interaction.reply(`failed to ban ${member.user.tag}`)
            }
        }
    }
}