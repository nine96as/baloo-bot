import {SlashCommandBuilder, EmbedBuilder} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("sends a ping request!")

export async function execute(interaction) {
    const msg = await interaction.reply({
        content: "🏓 | pong!",
        fetchReply: true,
    })
    
    await interaction.editReply(`🏓 | pong! \`${msg.createdTimestamp - interaction.createdTimestamp}ms\``);
}
