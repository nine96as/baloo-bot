/* eslint-disable no-unused-vars */
import { Client } from 'discord.js'
import { ldModel } from '../models/lockdown.js'

/**
 * @param {Client} client bot client;
 */
export const ldSystem = async (client) => {
    ldModel.find().then(async (docArray) => {
        docArray.forEach(async (d) => {
            // finds locked channels (if any)
            const channel = client.guilds.cache
                .get(d.guildId)
                .channels.cache.get(d.channelId)

            // if there are no locked channels, nothing to be done
            if (!channel) return

            // if the current time matches lockdown expiry time,
            // lockdown is ended
            const timeNow = Date.now()
            if (d.time < timeNow) {
                channel.permissionOverwrites.edit(d.guildId, {
                    SendMessages: null,
                })
                return await ldModel.deleteOne({ channelId: channel.id })
            }

            // if above condition not met, expiry duration is logged,
            // with lockdown ending when the duration has elapsed
            const end = d.time - Date.now()

            setTimeout(async () => {
                channel.permissionOverwrites.edit(d.guildId, {
                    SendMessages: null,
                })
                await ldModel.deleteOne({ channelId: channel.id })
            }, end)
        })
    })
}
