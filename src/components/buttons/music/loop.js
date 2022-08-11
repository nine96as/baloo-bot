import { QueueRepeatMode } from 'discord-player'

export const name = 'loop'

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

    const modes = ['off', 'track', 'queue']
    const repeatMode = queue.repeatMode

    if (repeatMode === 0) {
        await queue.setRepeatMode(QueueRepeatMode.TRACK)
    } else if (repeatMode === 1) {
        await queue.setRepeatMode(QueueRepeatMode.QUEUE)
    } else if (repeatMode === 2) {
        await queue.setRepeatMode(QueueRepeatMode.OFF)
    }

    return await interaction.editReply(
        `🔁 | looping ${modes[queue.repeatMode]}!`
    )
}
