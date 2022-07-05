const ldModel = require("../../models/lockdown");
const ms = require("ms");
const {SlashCommandBuilder} = require("@discordjs/builders");
const {PermissionFlagsBits} = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lock")
        .setDescription("put this channel into lockdown")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption(option => option
            .setName("duration")
            .setDescription("duration of lockdown (1m, 1h, 1d)"))
        .addStringOption(option => option
            .setName("reason")
            .setDescription("reason for lockdown")),
    async execute(interaction) {
        const reason = interaction.options.getString("reason") || "no reason given";

        if (!interaction.channel.permissionsFor(interaction.guildId).has("SEND_MESSAGES")) {
            interaction.editReply({
                content: "🔒 | this channel is already locked.",
                ephemeral: true,
            })
        }

        //prevents messages being sent in channel
        interaction.channel.permissionOverwrites.edit(interaction.guildId, {
            SEND_MESSAGES: false,
        })

        interaction.editReply(`🔒 | this channel is now locked with a reason of "${reason}"`);

        const duration = interaction.options.getString("duration");

        if (duration) {
            const end = Date.now() + ms(duration);
            ldModel.create({
                guildId: interaction.guildId,
                channelId: interaction.channel.id,
                time: end
            })

            setTimeout(async () => {
                interaction.channel.permissionOverwrites.edit(interaction.guildId, {
                    SEND_MESSAGES: null,
                })
                interaction
                    .editReply("🔓 | the lockdown has been lifted.")
                    .catch(() => {});
                await ldModel.deleteOne({channelId: interaction.channel.id});
            }, ms(duration));
        }

    }   
}
