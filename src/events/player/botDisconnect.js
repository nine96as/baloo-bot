export const name = 'botDisconnect'

export async function execute(queue) {
    queue.metadata.channel
        .send('❌ | i was disconnected from the voice channel, clearing queue!')
        .then((msg) => {
            setTimeout(() => msg.delete(), 5000)
        })
}
