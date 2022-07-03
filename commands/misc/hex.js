const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageActionRow, MessageButton} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hex")
        .setDescription("displays discord hex colour values"),
    async execute(interaction) {
        const components = [
            new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId("danger")
                    .setLabel("danger")
                    .setStyle("DANGER"),

                new MessageButton()
                    .setCustomId("success")
                    .setLabel("success")
                    .setStyle("SUCCESS"),
                
                new MessageButton()
                    .setCustomId("primary")
                    .setLabel("primary")
                    .setStyle("PRIMARY"),
            )
        ]

            await interaction.editReply({
                content: "click buttons to get colours:",
                emphemeral: true,
                components
            })
    }
}