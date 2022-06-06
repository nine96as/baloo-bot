const Discord = require("discord.js"); //imports discord.js package
const generateImage = require("./generateImage");
require("dotenv").config();

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

client.on("ready", () => { //anonymous function - once a ready event happens, runs function
    console.log(`Logged in as ${client.user.tag}`);
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

client.slashcommands = new Discord.Collection();

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload);
client.loadSlashCommands(bot, false);

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;
    if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server");

    const slashcommand = client.slashcommands.get(interaction.commandName);

    if (!slashcommand) return interaction.reply("Invalid slash command");

    if (slashcommand.perm && !interaction.member.permissions.has(slashcommand.perm)) {
        return interaction.reply("You do not have permission for this command");
    }

    slashcommand.run(client, interaction);
})

client.login(process.env.TOKEN); //login to bot