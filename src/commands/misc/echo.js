import { SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('echo')
    .setDescription('🗣️ replies with your input')
    .addStringOption((option) =>
        option
            .setName('input')
            .setDescription('input to echo back')
            .setRequired(true)
    )

export async function execute(interaction) {
    const message = interaction.options.getString('input')
    await interaction.reply(`🗣️ | ${message}`)
}
