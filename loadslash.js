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
})

let bot = {
    client,
    owners: ["973639270625574932"],
}

const guildID = "982003736962535424"

client.slashcommands = new Discord.Collection();

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload);
client.loadSlashCommands(bot, false);

client.on("ready", async () => { //anonymous function - once a ready event happens, runs function
    const guild = client.guilds.cache.get(guildID);

    if (!guild) return console.error("Target guild not found");
    
    await guild.commands.set([...client.slashcommands.values()]);
    console.log(`Successfully loaded in ${client.slashcommands.size} commands`)
    process.exit(0);
})

const welcomeChannelID = "982009784305860678";
//new member welcome message
client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member);
    member.guild.channels.cache.get(welcomeChannelID).send({
       content: `<@${member.id}> Welcome to the server!`,
       files: [img]
    })
})

client.login(process.env.TOKEN); //login to bot