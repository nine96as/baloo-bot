export const name = 'pauseplay'

export async function execute(interaction) {
    // checks if user is in a voice channel
    if (!interaction.member.voice.channel) {
        return interaction.editReply('❌ | please join a voice channel first!')
    }

    const queue = interaction.client.player.getQueue(interaction.guildId)

    // checks if there is anything playing
    if (!queue || !queue.playing) {
        return interaction.editReply(
            '❌ | no music is being played in this guild'
        )
    }

    // variable x used to validate whether pause can be carried out
    const x = queue.setPaused(true)

    // if it fails, then set to play
    if (!x) queue.setPaused(false)

    return await interaction.editReply(
        x ? '⏸️ | music has been paused!' : '▶️ | music has been resumed!'
    )
}