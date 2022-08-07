/* eslint-disable require-jsdoc */
export const name = 'channelEmpty';

export async function execute(queue) {
  queue.metadata.channel.send(
      '❌ | nobody is in the voice channel, leaving...',
  );
}
