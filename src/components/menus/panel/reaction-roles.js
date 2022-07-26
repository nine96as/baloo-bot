export const name = "reactionroles"

export async function execute(interaction) {
    const roleId = interaction.values[0];
    const role = interaction.guild.roles.cache.get(roleId);
    const memberRoles = interaction.member.roles;
    const hasRole = memberRoles.cache.has(roleId);

    if (hasRole) {
        memberRoles.remove(roleId);
        interaction.editReply(`✅ | ${role.name} has been removed from you!`);
    } else {
        memberRoles.add(roleId);
        interaction.editReply(`✅ | ${role.name} has been assigned to you!`);
    }
}
