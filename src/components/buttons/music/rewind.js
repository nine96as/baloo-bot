/* eslint-disable require-jsdoc */
export const name = 'rewind';

export async function execute(interaction) {
  // checks if user is in a voice channel
  if (!interaction.member.voice.channel) {
    return interaction.editReply('❌ | please join a voice channel first!');
  }

  const queue = interaction.client.player.getQueue(interaction.guildId);

  // checks if queue is empty
  if (!queue) {
    return await interaction.editReply('❌ | there are no songs in the queue');
  }

  if (queue.previousTracks.length > 1) {
    const rewind = queue.back();
    return await interaction.editReply(
            rewind ?
                '⏮️ | rewinded to previous track!' :
                '❌ | failed to rewind to previous track',
    );
  } else {
    return interaction.editReply({
      content: '❌ | no previous track to rewind to',
      ephemeral: true,
    });
  }
}
