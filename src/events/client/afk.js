/* eslint-disable no-unused-vars */
import { afkModel } from '../../models/afk.js';
import { Message } from 'discord.js';

export const name = 'messageCreate';

/**
 * @param {Message} message
 */
export async function execute(message) {
    if (message.author.bot) return;

    // await afkModel.findOne({
    //     guildId: message.guild.id,
    //     userId: message.author.id,
    // })
    // .then(async () => {
    //     message.reply(`welcome back, you were away for <t:${data.time}:R>`)
    //     .then(repliedMsg => {
    //         setTimeout(() => repliedMsg.delete(), 5000)
    //     })
    // })

    await afkModel.deleteOne({
        guildId: message.guild.id,
        userId: message.author.id,
    });

    if (message.mentions.members.size) {
        message.mentions.members.forEach((m) => {
            afkModel.findOne(
                {
                    guildId: message.guild.id,
                    userId: m.id,
                },
                async (e, data) => {
                    if (e) throw e;
                    if (data) {
                        message.reply(
                            `${m} went AFK <t:${data.time}:R> - ${data.status}`
                        );
                    }
                }
            );
        });
    }
}
