const {Client, Collection, Intents} = require("discord.js"); //imports discord.js package
const {Player} = require("discord-player");

//creates bot client - used to access discord api
const client = new Client({ 
    //things to look out for
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
})

client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

//initialises all handlers
require("./handlers/eventHandler")(client);
require("./handlers/interactionHandler")(client);
require("./handlers/init")(client);

//login to bot
client.login(process.env.TOKEN); 