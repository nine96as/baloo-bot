import {EmbedBuilder} from 'discord.js';

export const name = 'queueEnd';

// eslint-disable-next-line require-jsdoc
export async function execute(queue) {
  const embed = new EmbedBuilder()
      .setColor('Random')
      .setTitle('🎶 | queue end')
      .setDescription('the queue has ended, leaving...');

  queue.metadata.channel.send({embeds: [embed]});
}
