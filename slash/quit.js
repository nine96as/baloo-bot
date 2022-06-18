const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("stops bot and clears queue"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue) {
            return await interaction.editReply("there are no songs in the queue");
        }

        queue.destroy();
        await interaction.editReply("bye!")
    }
}