/* eslint-disable no-unused-vars */
import { afkModel } from '../../models/afk.js'
import { Message } from 'discord.js'
import wait from 'node:timers/promises'

export const name = 'messageCreate'

/**
 * @param {Message} message
 */
export async function execute(message) {
    if (message.author.bot) return

    await afkModel.deleteOne({
        guildId: message.guild.id,
        userId: message.author.id,
    })
    // .then(async () => {
    //     message.reply("welcome back, your AFK has been removed");
    //     await wait.setTimeout(5000);
    //     message.deleteReply();
    // });

    if (message.mentions.members.size) {
        message.mentions.members.forEach((m) => {
            afkModel.findOne(
                {
                    guildId: message.guild.id,
                    userId: m.id,
                },
                async (e, data) => {
                    if (e) throw e
                    if (data) {
                        message.reply(
                            `${m} went AFK <t:${data.time}:R> - ${data.status}`
                        )
                    }
                }
            )
        })
    }
}
