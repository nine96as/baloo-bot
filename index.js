const fs = require("node:fs");
const path = require("node:path");
const {Client, Collection, Intents} = require("discord.js"); //imports discord.js package
const dotenv = require("dotenv");
const generateImage = require("./generateImage");

dotenv.config();

const TOKEN = process.env.TOKEN;
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;

//creates bot client - used to access discord api
const client = new Client({ 
    //things to look out for
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

//devises the dynamic retrieval of command files
client.commands = new Collection();
//constructs and stores path "commands"
const commandsPath = path.join(__dirname, "commands");
//returns array of file names in directory
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    //set new item in collection
    //key as command name, value as exported module
    client.commands.set(command.data.name, command);
}

//constructs and stores path "events"
const eventsPath = path.join(__dirname, "events");
//returns array of file names in directory
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    /*
    * "on" and "once" methods take event name and a callback function
    * callback function takes arguments returned by respective event,
    * collects them in args array using ... syntax
    */
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

//interaction listener
client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    //checks if command exists in commands collection
    const command = client.commands.get(interaction.commandName);

    //exits early if command doesn't exist
    if (!command) return;

    //if command exists, tries to carry out "execute" function
    try {
        await command.execute(interaction);
    } catch (e) {
        console.error(e);
        await interaction.reply({
            content: "error executing this command",
            ephemeral: true
        })
    }
})

//new member welcome message
client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member);
    member.guild.channels.cache.get(WELCOME_CHANNEL_ID).send({
       content: `<@${member.id}> welcome to the server!`,
       files: [img]
    })
})

//login to bot
client.login(TOKEN); 