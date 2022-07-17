module.exports = {
	name: "botDisconnect",
	async execute(queue) {
		queue.metadata.channel.send(
			"❌ | i was disconnected from the voice channel, clearing queue!"
		)
	}
}