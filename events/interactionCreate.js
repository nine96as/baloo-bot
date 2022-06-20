module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        const {client} = interaction;

        if (!interaction.isCommand()) return;

        //checks if command exists in commands collection
        const command = client.commands.get(interaction.commandName);

        //exits early if command doesn't exist
        if (!command) return;

        //if command exists, tries to carry out "execute" function
        try {
            await interaction.deferReply();
            await command.execute(interaction);
        } catch (e) {
            console.error(e);
            await interaction.reply({
                content: "error executing this command",
                ephemeral: true
            })
        }
    }
}
