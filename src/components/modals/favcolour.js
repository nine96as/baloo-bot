export const name = "favcolour";

export async function execute(interaction, client) {
    await interaction.reply({
        content: `your fav colour is ${interaction.fields.getTextInputValue("favColourInput")}`,
        ephemeral: true,
    })
}
