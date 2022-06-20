const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("get info about a user or server")
        .addSubcommand(subcommand => subcommand
            .setName("user")
            .setDescription("info about a user")
            .addUserOption(option => option
                .setName("target")
                .setDescription("the user")))
        .addSubcommand(subcommand => subcommand
            .setName("server")
            .setDescription("info about the server")),
    async execute(interaction) {
        if (interaction.commandName === "info") {
            if (interaction.options.getSubcommand() === "user") {
                const member = interaction.options.getMember("target") || interaction.member;

                const embed = new MessageEmbed()
                    .setColor(member.user.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
                    .setTitle(`${member.user.tag}`)
                    .setDescription(`${member.user}`)
                    .setFooter({
                      text: `ID: ${member.user.id}` 
                    })
                    .setTimestamp()
                    .setThumbnail(member.user.avatarURL({size: 512, dynamic: true}))
                    .addFields(
                        {name: "joined", value: member.joinedAt.toLocaleString()},
                        {name: "registered", value: member.user.createdAt.toLocaleString()},
                        {name: "roles", value: `${member.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "none"}`},
                    )
                await interaction.editReply({
                    embeds: [embed]
                })
            } else if (interaction.options.getSubcommand() === "server") {
                const member = interaction.member

                const embed = new MessageEmbed()
                    .setColor(member.user.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
                    .setTitle(`${interaction.guild.name}`)
                    .setThumbnail(interaction.guild.iconURL({size: 512, dynamic: true}))
                    .addFields(
                        {name: "owner", value: `${interaction.guild.owner}`},
                        {name: "total members", value: `${interaction.guild.memberCount}`},
                        {name: "total roles", value: `${interaction.guild.roles.cache.size}`},
                        {name: "total channels", value: `${interaction.guild.channels.cache.size}`},
                        {name: "created at", value: interaction.guild.createdAt.toLocaleString()}
                    )

                await interaction.editReply({
                    embeds: [embed]
                })
            }
        }
    }        
}