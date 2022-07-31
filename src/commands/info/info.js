import {SlashCommandBuilder, EmbedBuilder} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("info")
    .setDescription("🔬 get info about a user or server")
    .addSubcommand(subcommand => subcommand
        .setName("user")
        .setDescription("🔬 info about a user")
        .addUserOption(option => option
            .setName("target")
            .setDescription("the user")))
    .addSubcommand(subcommand => subcommand
        .setName("server")
        .setDescription("🔬 info about the server"))

export async function execute(interaction) {
    if (interaction.commandName === "info") {
        if (interaction.options.getSubcommand() === "user") {
            const member = interaction.options.getMember("target") || interaction.member;

            const embed = new EmbedBuilder()
                .setColor(member.user.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
                .setAuthor({iconURL: member.user.displayAvatarURL(), name: member.user.tag})
                .setDescription(`${member.user}`)
                .setFooter({
                  text: `ID: ${member.user.id}` 
                })
                .setTimestamp()
                .setThumbnail(member.user.avatarURL({size: 512, dynamic: true}))
                .addFields(
                    {name: "joined", value: member.joinedAt.toLocaleString()},
                    {name: "registered", value: member.user.createdAt.toLocaleString()},
                    {name: "roles", value: `${member.roles.cache.map((r) => r).join(" ").replace("@everyone", "") || "none"}`},
                    {name: "permissions", value: `${member.permissions.toArray().map(p => p.toLowerCase()).join(", ").replaceAll("_", " ") || "none"}`}
                )
            await interaction.reply({
                embeds: [embed]
            })
        } else if (interaction.options.getSubcommand() === "server") {
            const member = interaction.member

            const embed = new EmbedBuilder()
                .setColor("Random")
                .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})})
                .setThumbnail(interaction.guild.iconURL({dynamic: true}))
                .setFooter({
                    text: `ID: ${interaction.guild.id}` 
                })
                .setTimestamp()
                .addFields(
                    {name: "owner", value: `<@${interaction.guild.ownerId}>`},
                    {name: "total members", value: `${interaction.guild.memberCount}`},
                    {name: "total roles", value: `${interaction.guild.roles.cache.size}`},
                    {name: "total channels", value: `${interaction.guild.channels.cache.size}`},
                    {name: "text channels", value: `${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}`},
                    {name: "voice channels", value: `${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}`},
                    {name: "role list", value: `${interaction.guild.roles.cache.map((r) => r).join(" ") || "none"}`},
                    {name: "created at", value: `||${interaction.guild.createdAt.toLocaleString()}||`}
                )

            await interaction.reply({
                embeds: [embed]
            })
        }
    }
}