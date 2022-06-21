const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("displays song queue")
        .addNumberOption(option => option
            .setName("page")
            .setDescription("page number of queue")
            .setMinValue(1)),
    async execute(interaction) {
        //checks if user is in a voice channel
        if (!interaction.member.voice.channel) {
            return interaction.editReply("please join a voice channel first!");
        }
        
        const queue = interaction.client.player.getQueue(interaction.guildId);

        //checks if queue is empty
        if (!queue) {
            return await interaction.editReply("there are no songs in the queue");
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
        const page = (interaction.options.getNumber("page") || 1) - 1;

        //checks if inputted page num exceeds total page number
        if (page > totalPages) {
            return interaction.editReply(
                `page provided invalid; there are only ${totalPages} pages of songs`
                )
        }

        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(page * 10, page * 10 + 10).map((track, i) => {
			return `**${page * 10 + i + 1}.** \`[${track.duration}]\` [${track.title}](${track.url})`;
		}).join("\n");

        const embed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`queue for ${interaction.guild.name}`)
            .setDescription(
                `**🎶 | now playing**\n` + 
                (currentTrack
                    ? `\`[${currentTrack.duration}]\` [${currentTrack.title}](${currentTrack.url})`
                    : "none") +
                `\n\n**🗒️ | queue**\n${tracks}`
            )
            .setFooter({
                text: `page ${page + 1} of ${totalPages}`
            })
            .setThumbnail(currentTrack.thumbnail)
        
        return interaction.editReply({embeds: [embed]});
    }
}