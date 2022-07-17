module.exports = {
    name: "error",
    async execute(queue, error) {
        console.error(error);
        queue.metadata.send(
            `❌ | error emitted from queue: ${error.message}`
        )
    }
}