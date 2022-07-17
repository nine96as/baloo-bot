module.exports = {
    name: "channelEmpty",
    async execute(queue) {
        queue.metadata.send(
            "❌ | nobody is in the voice channel, leaving..."
        )
    }
}