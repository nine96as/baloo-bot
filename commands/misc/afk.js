const afkModel = require('../../models/afk');
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("afk")
        .setDescription("AFK system")
        .addSubcommand(subcommand => subcommand
            .setName("set")
            .setDescription("set/update your AFK status")
            .addStringOption(option => option
                .setName("status")
                .setDescription("status to be set/updated")
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName("return")
            .setDescription("return from being AFK")),
    async execute(interaction) {
        const status = interaction.options.getString("status");
        
        try {
            switch (interaction.options.getSubcommand()) {
                case "set":
                    await afkModel.findOneAndUpdate(
                        {guildId: interaction.guildId, userId: interaction.user.id},
                        {status: status, time: parseInt(interaction.createdTimestamp / 1000)},
                        {new: true, upsert: true}
                    )

                    return interaction.editReply(`${interaction.member} has gone AFK: ${status}`)
                case "return":
                    await afkModel.deleteOne({
                        guildId: interaction.guildId,
                        userId: interaction.user.id
                    })

                    return interaction.editReply({
                        content: "your AFK status has been removed.",
                        ephemeral: true,
                    })
            }
        } catch (e) {
            console.error(e);
        }
    }
}