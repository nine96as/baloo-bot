import {ldModel} from "../../models/lockdown.js";
import {SlashCommandBuilder, PermissionFlagsBits} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("remove a channel from lockdown")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)

export async function execute(interaction) {
    if (interaction.channel.permissionsFor(interaction.guildId).has("SEND_MESSAGES")) {
        return interaction.editReply({
            content: "🔒 | this channel is not locked.",
            ephemeral: true,
        })
    }

    interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
        SEND_MESSAGES: null,
    })

    await ldModel.deleteOne({channelId: interaction.channel.id});

    interaction.editReply("🔓 | the lockdown has been lifted.");
}