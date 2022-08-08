import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('banner')
    .setDescription("🔬 get a user's banner")
    .addSubcommand((subcommand) =>
        subcommand
            .setName('user')
            .setDescription("🔬 a user's banner")
            .addUserOption((option) =>
                option.setName('target').setDescription('the user')
            )
    )
    .addSubcommand((subcommand) =>
        subcommand.setName('server').setDescription('🔬 the server banner')
    )

export async function execute(interaction) {
    if (interaction.options.getSubcommand() === 'user') {
        const member =
            interaction.options.getMember('target') || interaction.member

        await member.user.fetch(true)

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: member.user.avatarURL(),
                name: member.user.tag,
            })
            .setImage(member.user.bannerURL({ size: 2048 }))

        member.user.bannerURL()
            ? await interaction.reply({
                  embeds: [embed],
              })
            : interaction.reply("❌ | this user doesn't have a banner")
    } else if (interaction.options.getSubcommand() === 'server') {
        const guild = interaction.guild

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({
                iconURL: guild.iconURL(),
                name: guild.name,
            })
            .setImage(guild.bannerURL({ size: 2048 }))

        guild.bannerURL()
            ? await interaction.reply({
                  embeds: [embed],
              })
            : interaction.reply("❌ | this server doesn't have a banner")
    }
}
