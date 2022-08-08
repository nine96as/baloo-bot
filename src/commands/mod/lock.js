import { ldModel } from '../../models/lockdown.js'
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import ms from 'ms'

export const data = new SlashCommandBuilder()
    .setName('lock')
    .setDescription('🚨 put this channel into lockdown')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addStringOption((option) =>
        option
            .setName('duration')
            .setDescription('duration of lockdown (1m, 1h, 1d)')
    )
    .addStringOption((option) =>
        option.setName('reason').setDescription('reason for lockdown')
    )

export async function execute(interaction) {
    const reason = interaction.options.getString('reason') || 'no reason given'

    if (
        !interaction.channel
            .permissionsFor(interaction.guildId)
            .has(PermissionFlagsBits.SendMessages)
    ) {
        interaction.reply({
            content: '🔒 | this channel is already locked.',
            ephemeral: true,
        })
    }

    // prevents messages being sent in channel
    interaction.channel.permissionOverwrites.edit(interaction.guildId, {
        SendMessages: false,
    })

    interaction.reply(
        `🔒 | this channel is now locked with a reason of "${reason}"`
    )

    const duration = interaction.options.getString('duration')

    if (duration) {
        const end = Date.now() + ms(duration)
        ldModel.create({
            guildId: interaction.guildId,
            channelId: interaction.channel.id,
            time: end,
        })

        setTimeout(async () => {
            interaction.channel.permissionOverwrites.edit(interaction.guildId, {
                SendMessages: null,
            })
            interaction
                .followUp('🔓 | the lockdown has been lifted.')
                .catch(() => {})
            await ldModel.deleteOne({ channelId: interaction.channel.id })
        }, ms(duration))
    }
}
