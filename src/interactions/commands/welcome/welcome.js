import { welcModel } from '../../../models/welcome.js';
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('welcome')
    .setDescription('welcome system setup')
    .addSubcommand((subcommand) => 
        subcommand
            .setName('set')
            .setDescription('⚙️ set welcome channel')
            .addChannelOption((option) =>
                option
                    .setName('channel')
                    .setDescription('target channel')
                    .setRequired(true)
            )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export async function execute(interaction) {
    try {
        if (interaction.options.getSubcommand() === 'set') {
            const channel = interaction.options.getChannel('channel');

            await welcModel.findOneAndUpdate(
                {
                    guildId: interaction.guildId,
                },
                {
                    channelId: channel.id,
                },
                { new: true, upsert: true }
            );

            interaction.reply(`✅ | set welcome channel as <#${channel.id}>`);
        }
    } catch (e) {
        console.error(e);
    }
}
