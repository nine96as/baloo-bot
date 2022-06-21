const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("check or set volume")
        .addIntegerOption(option => option
            .setName("level")
            .setDescription("volume level to be set (1-100)")),
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

        const volume = interaction.options.getInteger("level");

        if (!volume) {
            return interaction.editReply(`🔊 | volume: ${queue.volume}`);
        } else if (volume.value < 0 || volume.value > 100) {
            interaction.editReply("volume must be within 1-100");
        }
        
        const v = await queue.setVolume(volume);
        return interaction.editReply(
            v 
                ? `🔊 | volume set to ${volume}`
                : `volume change failed!`
        )
    }
}