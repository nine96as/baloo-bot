export const name = 'error'

export async function execute(queue, error) {
    console.error(error)
    queue.metadata.channel.send(
        `❌ | error emitted from queue: ${error.message}`
    )
}
