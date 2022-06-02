const Discord = require("discord.js"); //imports discord.js package
require("dotenv").config();

//creates bot client - used to access discord api
const client = new Discord.Client({ 
    intents: [ //things to look out for
        "GUILDS",
        "GUILD_MESSAGES"
    ]
}); 

client.on("ready", () => { //anonymous function - once a ready event happens, runs function
    console.log(`Logged in as ${client.user.tag}`);
});

//sends message everytime "hi" is sent by user
client.on("messageCreate", (message) => {
    if (message.content == "hi") {
        message.reply("Hello World!");
    }
});

client.login(process.env.TOKEN); //login to bot