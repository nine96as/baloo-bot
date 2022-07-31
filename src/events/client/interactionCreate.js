import {InteractionType} from "discord.js";

export const name = "interactionCreate";

export async function execute(interaction) {
    const {client} = interaction;

    if (interaction.isChatInputCommand()) {
        //checks if command exists in commands collection
        const command = client.commands.get(interaction.commandName);

        //exits early if command doesn't exist
        if (!command) return;

        //music command needs to be deferred
        if (interaction.commandName === "music") {
            //if command exists, tries to carry out "execute" function
            try {
                await interaction.deferReply();
                await command.execute(interaction);
            } catch (e) {
                console.error(e);
                await interaction.editReply({
                    content: "❌ | error executing this command",
                    ephemeral: true
                })
            }
        } else {
            //if command exists, tries to carry out "execute" function
            try {
                await command.execute(interaction);
            } catch (e) {
                console.error(e);
                await interaction.editReply({
                    content: "❌ | error executing this command",
                    ephemeral: true
                })
            }
        }
    } else if (interaction.isButton()) {
        //checks if button exists in buttons collection
        const button = client.buttons.get(interaction.customId);

        //exits early if button doesn't exist
        if (!button) return;

        //if button exists, tries to carry out "execute" function
        try {
            await interaction.deferReply({ephemeral: true});
            await button.execute(interaction);
        } catch (e) {
            console.error(e);
            await interaction.editReply({
                content: "❌ | error executing this button",
                ephemeral: true
            })
        }
    } else if (interaction.isSelectMenu()) {
        //checks if menu exists in menus collection
        const menu = client.menus.get(interaction.customId);

        //exits early if menu doesn't exist
        if (!menu) return;

        //if menu exists, tries to carry out "execute" function
        try {
            await interaction.deferReply({ephemeral: true});
            await menu.execute(interaction);
        } catch (e) {
            console.error(e);
            await interaction.editReply({
                content: "❌ | error executing this menu",
                ephemeral: true
            })
        }
    } else if (interaction.type === InteractionType.ModalSubmit) {
        //checks if modal exists in modal collection
        const modal = client.modals.get(interaction.customId);

        //exists early if modal doesn't exist
        if (!modal) return;

        //if modal exists, tries to carry out "execute" function
        try {
            await interaction.deferReply({ephemeral: true});
            await modal.execute(interaction);
        } catch (e) {
            console.error(e);
            await interaction.editReply({
                content: "❌ | error executing this modal",
                ephemeral: true
            })
        }
    }
}
