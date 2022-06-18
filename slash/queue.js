const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("displays current song queue")
        //number used to display "pages" of songs
        .addNumberOption((option) => option
            .setName("page")
            .setDescription("page number of queue")
            .setMinValue(1)),
        
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) {
            return await interaction.editReply("there are no songs in the queue")
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
        //default page to be fetched is 1
        const page = (interaction.options.getNumber("page") || 1) - 1;

        if (page > totalPages) {
            return await interaction.editReply(`invalid page. there are only a total of ${totalPages} pages`);
        }

        //fetches 10 songs from inputted page
        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`;
        }).join("\n") //splits each song index with newline

        const currentSong = queue.current;

        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`**currently playing**\n` + 
                    (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") +
                    `\n\n**queue**\n${queueString}`)
                    .setFooter({
                        text: `page ${page + 1} of ${totalPages}`
                    })
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}