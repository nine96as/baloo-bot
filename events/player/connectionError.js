module.exports = {
    name: "connectionError",
    async execute(queue, error) {
        console.error(error);
        queue.metadata.send(
            `❌ | error emitted from connection: ${error.message}`
        )
    }
}