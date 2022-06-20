const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");
const dotenv = require("dotenv");

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const TOKEN = process.env.TOKEN;

const init = (client) => {
    const commandsData = [
        ...Array.from(client.commands.values()).map((c) => c.data.toJSON()),
    ]

    const rest = new REST({version: "9"}).setToken(TOKEN);

    (async () => {
        try {
            console.log("refreshing application (/) commands.");
            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commandsData});
            console.log("successfully reloaded application (/) commands.");
        } catch (e) {
            console.error(e);
        }
    })();
}

module.exports = init;
