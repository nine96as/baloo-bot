//imports discord.js and discord-player package
import {Client, Collection, GatewayIntentBits} from "discord.js"; 
import {Player} from "discord-player";

//imports handlers for bot
import {handleBot} from "./handlers/botHandler.js";
import {init} from "./handlers/init.js";

//creates bot client - used to access discord api
export const client = new Client({ 
    //things to look out for
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ]
})

client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.modals = new Collection();
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

//initialises all handlers
await(handleBot(client));
await(init(client));

//login to bot
client.login(process.env.TOKEN); 
