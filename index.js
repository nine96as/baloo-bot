const {Client, Collection, Intents} = require("discord.js"); //imports discord.js package
const {Player} = require("discord-player");
const handleEvents = require("./handlers/eventHandler");
const handleCommands = require("./handlers/commandHandler");
const handlePlayer = require("./handlers/playerEventHandler");
const handleJTC = require("./handlers/jtcHandler");
const init = require("./handlers/init");

//creates bot client - used to access discord api
const client = new Client({ 
    //things to look out for
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
})

client.commands = new Collection();
client.voiceGenerator = new Collection();
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

handleEvents(client, `${__dirname}/events`);
handleCommands(client, __dirname);
handlePlayer(client, `${__dirname}/events/player`);
handleJTC(client, `${__dirname}/events/voice`);
init(client);

//login to bot
client.login(process.env.TOKEN); 