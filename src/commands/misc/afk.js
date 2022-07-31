import {afkModel} from "../../models/afk.js";
import {SlashCommandBuilder} from "discord.js";
import wait from 'node:timers/promises';

export const data = new SlashCommandBuilder()
    .setName("afk")
    .setDescription("AFK system")
    .addSubcommand(subcommand => subcommand
        .setName("set")
        .setDescription("set/update your AFK status")
        .addStringOption(option => option
            .setName("status")
            .setDescription("status to be set/updated")
            .setRequired(true)))
    .addSubcommand(subcommand => subcommand
        .setName("return")
        .setDescription("return from being AFK"))

export async function execute(interaction) {
    const status = interaction.options.getString("status");
        
    try {
        switch (interaction.options.getSubcommand()) {
            case "set":
                await afkModel.findOneAndUpdate(
                    {guildId: interaction.guildId, userId: interaction.user.id},
                    {status: status, time: parseInt(interaction.createdTimestamp / 1000)},
                    {new: true, upsert: true}
                )

                return interaction.reply(`${interaction.member} has gone AFK: ${status}`);
            case "return":
                await afkModel.deleteOne({
                    guildId: interaction.guildId,
                    userId: interaction.user.id
                })

                interaction.editReply("✅ | your AFK status has been removed.");
                await wait.setTimeout(5000);
                return await interaction.deleteReply();
        }
    } catch (e) {
        console.error(e);
    }
}