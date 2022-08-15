import { EmbedBuilder } from 'discord.js';

export const name = 'queueEnd';

export async function execute(queue) {
    const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('🎶 | queue end')
        .setDescription('the queue has ended, leaving...');

    queue.metadata.channel.send({ embeds: [embed] }).then((msg) => {
        setTimeout(() => msg.delete(), 5000);
    });
}
