export const name = 'reactionroles';

/**
 * fetches role, checks whether guild member has the role specified,
 * then adds or removes it depending on whether the member has the role
 * or not
 * @param {any} interaction button interaction
 */
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
