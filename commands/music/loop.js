const {SlashCommandBuilder} = require("@discordjs/builders");
const {QueueRepeatMode} = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("set loop modes")
        .addStringOption(option => option
            .setName("mode")
            .setDescription("loop mode to be set")
            .addChoices(
                {name: "off", value: "off"},
                {name: "queue", value: "queue"},
                {name: "track", value: "track"},
            )
            .setRequired(true)),
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

        const mode = interaction.options.getString("mode");

        if (mode === "off") {
            const x  = await queue.setRepeatMode(QueueRepeatMode.OFF);
            return await interaction.editReply(
                x
                    ? `🔁 | looping ${mode}!`
                    : `loop mode change failed`
            )
        } else if (mode === "queue") {
            const x  = await queue.setRepeatMode(QueueRepeatMode.QUEUE);
            return await interaction.editReply(
                x
                    ? `🔁 | looping ${mode}!`
                    : `loop mode change failed`
            )
        } else if (mode === "track") {
            const x  = await queue.setRepeatMode(QueueRepeatMode.TRACK);
            return await interaction.editReply(
                x
                    ? `🔁 | looping ${mode}!`
                    : `loop mode change failed`
            )
        }
    }
}