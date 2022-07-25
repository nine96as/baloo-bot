import {SlashCommandBuilder, EmbedBuilder} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("get a user's avatar")
    .addUserOption(option => option
        .setName("target")
        .setDescription("member to the avatar from"))

export async function execute(interaction) {
    const member = interaction.options.getMember("target") || interaction.member;

    const embed = new EmbedBuilder()
        .setTitle(`${member.user.tag}`)
        .setImage(member.user.avatarURL({size: 2048, dynamic: true}))
    
    await interaction.editReply({
        embeds: [embed]
    })
}