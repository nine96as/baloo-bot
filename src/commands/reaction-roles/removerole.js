const rrModel = require("../../models/reactionRoles");
const {SlashCommandBuilder} = require("@discordjs/builders");
const {PermissionFlagsBits} = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("removerole")
        .setDescription("remove a custom reaction role")
        .addRoleOption(option => option
            .setName("role")
            .setDescription("role to be removed")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const role = interaction.options.getRole("role");

        //fetches data on guild
        const guildData = await rrModel.findOne({guildId: interaction.guildId});

        if (!guildData) {
            return interaction.editReply("❌ | there are no roles in this guild!");
        }

        const guildRoles = guildData.roles;
        
        //attempts to find role
        const findRole = guildRoles.find((r) => r.roleId === role.id);

        if (!findRole) {
            return interaction.editReply("❌ | that role isn't in the reaction role list!");
        }

        //stores roles not equal to the role.id specified (systematic removal)
        const filteredRoles = guildRoles.filter((r) => r.roleId !== role.id);
        guildData.roles = filteredRoles;

        await guildData.save();

        interaction.editReply(`✅ | removed ${role.name}`);
    }
}