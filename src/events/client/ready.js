/* eslint-disable require-jsdoc */
import { ldSystem } from '../../systems/lockdownSystem.js'
import { ActivityType } from 'discord.js'

// when bot is started, throws message to confirm
export const once = true

export const name = 'ready'

export async function execute(client) {
    console.log(`✅ | logged in as ${client.user.tag}.`)
    //   client.user.setPresence({
    //     activities: [{name: 'with discord.js'}],
    //     status: 'online',
    //   });
    client.user.setActivity('🧸 | some goofy bear stuff', {
        type: ActivityType.Playing,
    })
    // load up lockdown system
    ldSystem(client)
}
