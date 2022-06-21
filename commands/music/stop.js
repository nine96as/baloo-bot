const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("stops all music and clears queue"),
    async execute(interaction) {
        //checks if user is in a voice channel
        if (!interaction.member.voice.channel) {
            return interaction.editReply("please join a voice channel first!");
        }

        const queue = interaction.client.player.getQueue(interaction.guildId);

        //checks if there is anything playing
        if (!queue || !queue.playing) {
            return interaction.editReply("no music is being played in this guild");
        }

        queue.destroy();

        await interaction.editReply("⏹️ | cya!");
    }
}