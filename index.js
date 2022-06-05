const Discord = require("discord.js"); //imports discord.js package
require("dotenv").config();

const generateImage = require("./generateImage");

//creates bot client - used to access discord api
const client = new Discord.Client({ 
    intents: [ //things to look out for
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
}); 

let bot = {
    client,
    prefix: "a.",
    owners: ["973639270625574932"],
}

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);

module.exports = bot

//client.on("ready", () => { //anonymous function - once a ready event happens, runs function
//    console.log(`Logged in as ${client.user.tag}`);
//});

//sends message everytime "hi" is sent by user
client.on("messageCreate", (message) => {
    if (message.content == "hi") {
        message.reply("Hello World!");
    }
});

const welcomeChannelID = "982009784305860678";
//new member welcome message
client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member);
    member.guild.channels.cache.get(welcomeChannelID).send({
       content: `<@${member.id}> Welcome to the server!`,
       files: [img]
    })
});

client.login(process.env.TOKEN); //login to bot