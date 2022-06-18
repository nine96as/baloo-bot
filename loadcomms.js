const fs = require("node:fs");
const path = require("node:path");
const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");
const dotenv = require("dotenv");

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const TOKEN = process.env.TOKEN;

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({version: "9"}).setToken(TOKEN);

(async () => {
    try {
        console.log("refreshing application (/) commands.");
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands});
        console.log("successfully reloaded application (/) commands.");
    } catch (e) {
        console.error(e);
    }
})();
