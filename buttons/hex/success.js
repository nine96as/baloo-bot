module.exports = {
    name: "success",
    async execute(interaction) {
        await interaction.editReply("colour: #ED4245");
    }
}