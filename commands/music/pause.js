const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("pauses music"),
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

        queue.setPaused(true);

        await interaction.editReply("⏸️ | music has been paused!");
    }
}