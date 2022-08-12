import {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    EmbedBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js'

export const data = new ContextMenuCommandBuilder()
    .setName('reportUser')
    .setType(ApplicationCommandType.User)

export async function execute(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('reportUser')
        .setTitle('Report A User')
        .addComponents(
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId('reportMessage')
                    .setLabel('reason')
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph)
                    .setMinLength(10)
                    .setMaxLength(500)
            )
        )

    await interaction.showModal(modal)

    const modalSubmitInteraction = await interaction
        .awaitModalSubmit({
            time: 120000,
        })
        .catch((e) => {
            console.error(e)
        })

    const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('✅ | reported successfully')
        .addFields(
            { name: 'member', value: `${interaction.targetMember}` },
            {
                name: 'reason',
                value: `${modalSubmitInteraction.fields.getTextInputValue(
                    'reportMessage'
                )}`,
            }
        )

    modalSubmitInteraction.reply({
        embeds: [embed],
        ephemeral: true,
    })
}
