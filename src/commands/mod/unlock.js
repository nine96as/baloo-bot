const ldModel = require("../../models/lockdown");
const {SlashCommandBuilder} = require("@discordjs/builders");
const {PermissionFlagsBits} = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unlock")
        .setDescription("remove a channel from lockdown")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
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
}