const run = async (client, interaction) => {
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

module.exports = {
    name: "ban",
    description: "ban a member",
    perm: "BAN_MEMBERS",
    options: [
        {
            name: "user",
            description: "user to ban",
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