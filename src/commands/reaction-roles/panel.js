const rrModel = require("../../models/reactionRoles");
const {SlashCommandBuilder} = require("@discordjs/builders");
const {PermissionFlagsBits} = require('discord-api-types/v10');
const {MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("panel")
        .setDescription("creates a reaction role panel, with an embed message you can customise")
        .addStringOption(option => option
            .setName("title")
            .setDescription("sets embed title")
            .setRequired(true))
        .addStringOption(option => option
            .setName("description")
            .setDescription("sets embed description"))
        .addStringOption(option => option
            .setName("image")
            .setDescription("adds image to embed (url)"))
        .addStringOption(option => option
            .setName("colour")
            .setDescription("sets embed colour (hex)"))
        .addStringOption(option => option
            .setName("thumbnail")
            .setDescription("sets embed thumbnail (url)"))
        .addStringOption(option => option
            .setName("footer")
            .setDescription("sets embed footer"))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        //fetches data on guild
        const guildData = await rrModel.findOne({guildId: interaction.guildId});

        if (!guildData?.roles) {
            return interaction.editReply("❌ | there are no roles in this guild!");
        }

        const options = guildData.roles.map((x) => {
            const role = interaction.guild.roles.cache.get(x.roleId);

            return {
                label: role.name,
                value: role.id,
                description: x.roleDesc || "no description",
                emoji: x.roleEmoji
            }
        })

        const title = interaction.options.getString("title");
        const description = interaction.options.getString("description") || "";
        const image = interaction.options.getString("image");
        const colour = interaction.options.getString("colour");
        const thumbnail = interaction.options.getString("thumbnail");
        const footer = interaction.options.getString("footer");

        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setImage(image)
            .setColor(colour)
            .setThumbnail(thumbnail)
            .setFooter(footer)

        const components = [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("reactionroles")
                    .setMaxValues(1)
                    .addOptions(options)
            )
        ]
        interaction.editReply("✅ | success!")
        interaction.channel.send({embeds: [embed], components});
    }
}