const {SlashCommandBuilder, MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("get a user's avatar")
        .addUserOption(option => option
            .setName("target")
            .setDescription("member to the avatar from")),
    async execute(interaction) {
        const member = interaction.options.getMember("target") || interaction.member;

        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag}`)
            .setImage(member.user.avatarURL({size: 2048, dynamic: true}))
        
        await interaction.editReply({
            embeds: [embed]
        })
    }
}