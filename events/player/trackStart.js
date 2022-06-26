const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "trackStart",
    async execute(queue) {
        const embed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle("🎶 | now playing")
            .setDescription(`[${queue.nowPlaying().title}](${queue.nowPlaying().url})`)
            .setThumbnail(queue.nowPlaying().thumbnail)
            .addFields(
                {name: "by", value: queue.nowPlaying().author},
                {name: "duration", value: queue.nowPlaying().duration + "s"},
                {name: "requested by", value: `<@${queue.nowPlaying().requestedBy.id}>`},
            )
            
        queue.metadata.channel.send({embeds: [embed]});
    }
}