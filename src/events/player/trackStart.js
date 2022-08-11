import {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js'

export const name = 'trackStart'

export async function execute(queue) {
    const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('🎶 | now playing')
        .setDescription(
            `**[${queue.nowPlaying().title}](${queue.nowPlaying().url})**`
        )
        .setThumbnail(queue.nowPlaying().thumbnail)
        .addFields(
            { name: 'by', value: queue.nowPlaying().author },
            { name: 'duration', value: queue.nowPlaying().duration + 's' },
            {
                name: 'requested by',
                value: `<@${queue.nowPlaying().requestedBy.id}>`,
            }
        )

    const components = [
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('rewind')
                .setLabel('⏮️')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('pauseplay')
                .setLabel('⏯️')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('skip')
                .setLabel('⏭️')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('loop')
                .setLabel('🔁')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('stop')
                .setLabel('⏹️')
                .setStyle(ButtonStyle.Danger)
        ),
    ]

    queue.metadata.channel.send({ embeds: [embed], components }).then((msg) => {
        setTimeout(() => msg.delete(), 25000)
    })
}
