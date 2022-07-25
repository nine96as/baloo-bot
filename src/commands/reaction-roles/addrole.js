import {rrModel} from "../../models/reactionRoles.js";
import {SlashCommandBuilder, PermissionFlagsBits} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("add a custom reaction role")
    .addRoleOption(option => option
        .setName("role")
        .setDescription("role to be assigned")
        .setRequired(true))
    .addStringOption(option => option
        .setName("description")
        .setDescription("description of role"))
    .addStringOption(option => option
        .setName("emoji")
        .setDescription("emoji for the role"))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)

export async function execute(interaction) {
    const role = interaction.options.getRole("role");
    const roleDesc = interaction.options.getString("description") || null;
    const roleEmoji = interaction.options.getString("emoji") || null;

    //checks if role to be assigned is equal to or higher than bot's role
    if (role.position >= interaction.guild.me.roles.highest.position) {
        return interaction.editReply("❌ | i can't assign a role that is equal to or higher than me");
    }

    //fetches data on guild
    const guildData = await rrModel.findOne({guildId: interaction.guildId});

    const newRole = {
        roleId: role.id,
        roleDesc,
        roleEmoji
    }

    //attempts to fetch guild information, if not found then a directory is made for the guild
    if (guildData) {
        //attempts to fetch role data in database
        const roleData = guildData.roles.find((r) => r.roleId === role.id);

        //if found, directory is updated, otherwise a new directory is created
        if (roleData) {
            roleData = newRole;
        } else {
            guildData.roles = [...guildData.roles, newRole];
        }

        await guildData.save();
    } else {
        await rrModel.create({
            guildId: interaction.guildId,
            roles: newRole
        })
    }

    interaction.editReply(`✅ | created role ${role.name}`);
}