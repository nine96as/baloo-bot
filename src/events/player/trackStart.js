import {EmbedBuilder, ActionRowBuilder, ButtonBuilder} from "discord.js";

export const name =  "trackStart"

export async function execute(queue) {
    const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("🎶 | now playing")
        .setDescription(`**[${queue.nowPlaying().title}](${queue.nowPlaying().url})**`)
        .setThumbnail(queue.nowPlaying().thumbnail)
        .addFields(
            {name: "by", value: queue.nowPlaying().author},
            {name: "duration", value: queue.nowPlaying().duration + "s"},
            {name: "requested by", value: `<@${queue.nowPlaying().requestedBy.id}>`},
        )
    
    const components = [
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("rewind")
                .setLabel("⏮️")
                .setStyle("PRIMARY"),
            new ButtonBuilder()
                .setCustomId("skip")
                .setLabel("⏭️")
                .setStyle("PRIMARY"),
            new ButtonBuilder()
                .setCustomId("stop")
                .setLabel("⏹️")
                .setStyle("PRIMARY"),
            new ButtonBuilder()
                .setCustomId("looptrack")
                .setLabel("🔁")
                .setStyle("PRIMARY"),
            new ButtonBuilder()
                .setCustomId("shuffle")
                .setLabel("🔀")
                .setStyle("PRIMARY"),
        )
    ]

    queue.metadata.channel.send({embeds: [embed], components});
}