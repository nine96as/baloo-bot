import {
    ContextMenuCommandBuilder,
    EmbedBuilder,
    ApplicationCommandType,
} from 'discord.js';

export const data = new ContextMenuCommandBuilder()
    .setName('getAvatar')
    .setType(ApplicationCommandType.User);

export async function execute(interaction) {
    const member = interaction.targetMember;

    const embed = new EmbedBuilder()
        .setColor('Random')
        .setAuthor({
            iconURL: member.user.displayAvatarURL(),
            name: member.user.tag,
        })
        .setImage(member.user.avatarURL({ size: 2048, dynamic: true }));

    await interaction.reply({
        embeds: [embed],
    });
}
