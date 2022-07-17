const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "queueEnd",
    async execute(queue) {
        const embed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle("🎶 | queue end")
            .setDescription("the queue has ended, leaving...")
    }
}