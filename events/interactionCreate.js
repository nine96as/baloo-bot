module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        const {client} = interaction;

        if (interaction.isCommand()) {
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
                await interaction.editReply({
                    content: "error executing this command",
                    ephemeral: true
                })
            }
        }

        if (await interaction.isSelectMenu()) {
            //filters out the specific menu commands we want
            if (interaction.customId !== "reactionroles") return;
            
            await interaction.deferReply({ephemeral: true});
            const roleId = interaction.values[0];
            const role = interaction.guild.roles.cache.get(roleId);
            const memberRoles = interaction.member.roles;
            const hasRole = memberRoles.cache.has(roleId);

            if (hasRole) {
                memberRoles.remove(roleId);
                interaction.editReply(`${role.name} has been removed from you!`);
            } else {
                memberRoles.add(roleId);
                interaction.editReply(`${role.name} has been assigned to you!`);
            }
        }
    }
}
