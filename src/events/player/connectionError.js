export const name = 'connectionError'

export async function execute(queue, error) {
    console.error(error)
    queue.metadata.channel.send(
        `❌ | error emitted from connection: ${error.message}`
    ).then(msg => {
        setTimeout(() => msg.delete(), 5000)
    })
}
