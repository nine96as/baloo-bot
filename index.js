const {Client, Collection, Intents} = require("discord.js"); //imports discord.js package
const {Player} = require("discord-player");
const handleEvents = require("./handlers/eventHandler");
const handleCommands = require("./handlers/commandHandler");
const init = require("./handlers/init");
const dotenv = require("dotenv");

dotenv.config();

const TOKEN = process.env.TOKEN;

//creates bot client - used to access discord api
const client = new Client({ 
    //things to look out for
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})

client.commands = new Collection();
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

handleEvents(client, `${__dirname}/events`);
handleCommands(client, __dirname);
init(client);

//login to bot
client.login(TOKEN); 