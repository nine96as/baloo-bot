const afkModel = require('../../models/afk');
const {Message} = require("discord.js");

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message 
     */
    async execute(message) {
        if (message.author.bot) return;

        await afkModel.deleteOne({
            guildId: message.guild.id,
            userId: message.author.id
        })

        if (message.mentions.members.size) {
            message.mentions.members.forEach((m) => {
                afkModel.findOne({
                    guildId: message.guild.id,
                    userId: m.id
                }, async (e, data) => {
                    if (e) throw e;
                    if (data) {
                        message.reply(`${m} went AFK <t:${data.time}:R> - ${data.status}`);
                    }
                })
            })
        }
    }
}