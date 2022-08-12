import { rrModel } from '../../models/reactionRoles.js'
import {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
    PermissionFlagsBits,
} from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('reactionrole')
    .setDescription('reaction role system')
    .addSubcommand((subcommand) =>
        subcommand
            .setName('add')
            .setDescription('📂 add a custom reaction role')
            .addRoleOption((option) =>
                option
                    .setName('role')
                    .setDescription('role to be assigned')
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName('description')
                    .setDescription('description of role')
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName('emoji')
                    .setDescription('emoji for the role')
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('remove')
            .setDescription('📂 remove a custom reaction role')
            .addRoleOption((option) =>
                option
                    .setName('role')
                    .setDescription('role to be removed')
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('panel')
            .setDescription(
                '📂 creates a reaction role panel, with an embed' +
                    'message you can customise'
            )
            .addStringOption((option) =>
                option
                    .setName('title')
                    .setDescription('sets embed title')
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName('description')
                    .setDescription('sets embed description')
            )
            .addStringOption((option) =>
                option
                    .setName('image')
                    .setDescription('adds image to embed (url)')
            )
            .addStringOption((option) =>
                option
                    .setName('colour')
                    .setDescription('sets embed colour (hex)')
            )
            .addStringOption((option) =>
                option
                    .setName('thumbnail')
                    .setDescription('sets embed thumbnail (url)')
            )
            .addStringOption((option) =>
                option.setName('footer').setDescription('sets embed footer')
            )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)

export async function execute(interaction) {
    try {
        if (interaction.options.getSubcommand() === 'add') {
            const role = interaction.options.getRole('role')
            const roleDesc =
                interaction.options.getString('description') || null
            const roleEmoji = interaction.options.getString('emoji') || null

            // checks if role to be assigned is equal to or higher than bot's role
            if (
                role.position >=
                interaction.guild.members.me.roles.highest.position
            ) {
                return interaction.reply(
                    "❌ | i can't assign a role that is equal to or higher than me"
                )
            }

            // fetches data on guild
            const guildData = await rrModel.findOne({
                guildId: interaction.guildId,
            })

            const newRole = {
                roleId: role.id,
                roleDesc,
                roleEmoji,
            }

            // attempts to fetch guild information, if not found then a directory
            // is made for the guild
            if (guildData) {
                // attempts to fetch role data in database
                let roleData = guildData.roles.find((r) => r.roleId === role.id)

                // if found, directory is updated, otherwise a new directory is created
                if (roleData) {
                    roleData = newRole
                } else {
                    guildData.roles = [...guildData.roles, newRole]
                }

                await guildData.save()
            } else {
                await rrModel.create({
                    guildId: interaction.guildId,
                    roles: newRole,
                })
            }

            interaction.reply(`✅ | created role ${role.name}`)
        } else if (interaction.options.getSubcommand() === 'remove') {
            const role = interaction.options.getRole('role')

            // fetches data on guild
            const guildData = await rrModel.findOne({
                guildId: interaction.guildId,
            })

            if (!guildData) {
                return interaction.reply(
                    '❌ | there are no roles in this guild!'
                )
            }

            const guildRoles = guildData.roles

            // attempts to find role
            const findRole = guildRoles.find((r) => r.roleId === role.id)

            if (!findRole) {
                return interaction.reply(
                    "❌ | that role isn't in the reaction role list!"
                )
            }

            // stores roles not equal to the role.id specified (systematic removal)
            const filteredRoles = guildRoles.filter((r) => r.roleId !== role.id)
            guildData.roles = filteredRoles

            await guildData.save()

            interaction.reply(`✅ | removed ${role.name}`)
        } else if (interaction.options.getSubcommand() === 'panel') {
            // fetches data on guild
            const guildData = await rrModel.findOne({
                guildId: interaction.guildId,
            })

            if (!guildData?.roles) {
                return interaction.reply(
                    '❌ | there are no roles in this guild!'
                )
            }

            const options = guildData.roles.map((x) => {
                const role = interaction.guild.roles.cache.get(x.roleId)

                return {
                    label: role.name,
                    value: role.id,
                    description: x.roleDesc || 'no description',
                    emoji: x.roleEmoji || 'no emoji',
                }
            })

            const title = interaction.options.getString('title')
            const description = interaction.options.getString('description')
            const image = interaction.options.getString('image')
            const colour = interaction.options.getString('colour')
            const thumbnail = interaction.options.getString('thumbnail')
            const footer = interaction.options.getString('footer')

            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setImage(image)
                .setColor(colour)
                .setThumbnail(thumbnail)
                .setFooter(footer)

            const components = [
                new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('reactionroles')
                        .setMaxValues(1)
                        .addOptions(options)
                ),
            ]
            interaction.reply({ content: '✅ | success!', emphemeral: true })
            interaction.channel.send({ embeds: [embed], components })
        }
    } catch (e) {
        console.error(e)
    }
}
