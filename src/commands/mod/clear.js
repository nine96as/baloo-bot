import {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} from "discord.js";
import wait from 'node:timers/promises';

export const data = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("clears a specific amount of messages from a channel or target")
    .addNumberOption(option => option
        .setName("number")
        .setDescription("number of messages to clear")
        .setRequired(true))
    .addUserOption(option => option
        .setName("target")
        .setDescription("user to clear messages from"))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)

export async function execute(interaction) {
    const number = interaction.options.getNumber("number");
    const target = interaction.options.getMember("target");
    const messages = await interaction.channel.messages.fetch();

    if (target) {
        let i = 0;
        const filtered = [];
        (await messages).filter((m) => {
            if (m.author.id === target.id && number > i) {
                filtered.push(m);
                i++;
            }
        })

        await interaction.channel.bulkDelete(filtered, true).then(messages => {
            interaction.reply(`🧼 | cleared ${messages.size} message(s) from ${target}.`);
        })
    } else {
        await interaction.channel.bulkDelete(number, true).then(messages => {
            interaction.reply(`🧼 | cleared ${messages.size} message(s) from this channel.`);
        })
    }
    await wait.setTimeout(5000);
    await interaction.deleteReply();
}