export const name = 'botDisconnect';

// eslint-disable-next-line require-jsdoc
export async function execute(queue) {
  queue.metadata.channel.send(
      '❌ | i was disconnected from the voice channel, clearing queue!',
  );
}
