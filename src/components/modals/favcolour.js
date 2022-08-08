export const name = 'favcolour'

export async function execute(interaction) {
    await interaction.editReply({
        content: `your fav colour is ${interaction.fields.getTextInputValue(
            'favColourInput'
        )}`,
        ephemeral: true,
    })
}
