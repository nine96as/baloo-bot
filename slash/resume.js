const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("resumes music"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue) {
            return await interaction.editReply("there are no songs in the queue");
        }

        queue.setPause(false);
        await interaction.editReply("music has been resumed!");
    }
}