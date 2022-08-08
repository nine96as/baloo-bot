import { ldModel } from '../../models/lockdown.js'
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('🚨 remove a channel from lockdown')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)

export async function execute(interaction) {
    if (
        interaction.channel
            .permissionsFor(interaction.guildId)
            .has(PermissionFlagsBits.SendMessages)
    ) {
        return interaction.reply({
            content: '🔒 | this channel is not locked.',
            ephemeral: true,
        })
    }

    interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
        SendMessages: null,
    })

    await ldModel.deleteOne({ channelId: interaction.channel.id })

    interaction.reply('🔓 | the lockdown has been lifted.')
}
