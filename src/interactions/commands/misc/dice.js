import { SlashCommandBuilder } from 'discord.js';

const sides = [
    { name: 'd4', value: 4 },
    { name: 'd6', value: 6 },
    { name: 'd8', value: 8 },
    { name: 'd10', value: 10 },
    { name: 'd12', value: 4 },
    { name: 'd20', value: 20 },
];

export const data = new SlashCommandBuilder()
    .setName('dice')
    .setDescription('🎲 rolls the dice (d6 by default)')
    .addNumberOption((option) =>
        option
            .setName('sides')
            .setDescription('number of sides')
            .addChoices(
                { name: 'd4', value: 4 },
                { name: 'd6', value: 6 },
                { name: 'd8', value: 8 },
                { name: 'd10', value: 10 },
                { name: 'd12', value: 4 },
                { name: 'd20', value: 20 }
            )
    );

export async function execute(interaction) {
    const side = interaction.options.getNumber('sides');
    const min = 1;
    const max = sides.find((s) => side === s.value)?.value || 6;
    interaction.reply(`🎲 | rolled ${Math.floor(Math.random() * max) + min}!`);
}
