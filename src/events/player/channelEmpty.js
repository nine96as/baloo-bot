export const name = 'channelEmpty'

export async function execute(queue) {
    queue.metadata.channel.send(
        '❌ | nobody is in the voice channel, leaving...'
    ).then(msg => {
        setTimeout(() => msg.delete(), 5000)
    })
}
