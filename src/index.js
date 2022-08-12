import { config } from 'dotenv'

// imports discord.js and discord-player package
import { Client, Collection, GatewayIntentBits } from 'discord.js'
import { Player } from 'discord-player'

// imports handlers for bot
import { handleDatabase } from './handlers/databaseHandler.js'
import { handleEvents } from './handlers/eventHandler.js'
import { handleCommands } from './handlers/commandHandler.js'
import { handleComponents } from './handlers/componentHandler.js'

config()

const { token } = process.env

// creates bot client - used to access discord api
export const client = new Client({
    // things to look out for
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ],
})

client.commands = new Collection()
client.buttons = new Collection()
client.menus = new Collection()
client.modals = new Collection()
client.player = new Player(client, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25,
    },
})

try {
    // initialises all handlers
    await handleDatabase(client)
    await handleEvents(client)
    await handleCommands(client)
    await handleComponents(client)

    // login to bot
    client.login(token)
} catch (e) {
    console.error(e)
}
