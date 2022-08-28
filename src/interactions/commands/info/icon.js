import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('icon')
    .setDescription('🔬 get the server icon');

export async function execute(interaction) {
    const embed = new EmbedBuilder()
        .setColor('Random')
        .setAuthor({
            name: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
        })
        .setImage(interaction.guild.iconURL({ size: 2048 }));

    await interaction.reply({
        embeds: [embed],
    });
}
