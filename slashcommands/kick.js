const run = async (client, interaction) => {
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

module.exports = {
    name: "kick",
    description: "kick a member",
    perm: "KICK_MEMBERS",
    options: [
        {
            name: "user",
            description: "user to kick",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason for punishment",
            type: "STRING",
            required: false
        }
    ],
    run
}