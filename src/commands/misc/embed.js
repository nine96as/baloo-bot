import {SlashCommandBuilder, EmbedBuilder} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("embed")
    .setDescription("create an embed")
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
        
export async function execute(interaction) {
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description") || "";
    const image = interaction.options.getString("image");
    const colour = interaction.options.getString("colour");
    const thumbnail = interaction.options.getString("thumbnail");
    const footer = interaction.options.getString("footer");

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setImage(image)
        .setColor(colour)
        .setThumbnail(thumbnail)
        .setFooter(footer)

    await interaction.reply({
        embeds: [embed]
    })
}