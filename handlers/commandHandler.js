const fs = require("node:fs");

//registers "commands" path
const handleCommands = (client, filePath) => {
    const commands = fs.readdirSync(`${filePath}/commands`)
    
    for (const module of commands) {
        const commandFiles = fs.readdirSync(`${filePath}/commands/${module}`).filter(file => file.endsWith(".js"));

        for (const commandFile of commandFiles) {
            const command = require(`${filePath}/commands/${module}/${commandFile}`);
            //set new item in collection
            //key as command name, value as exported module
            client.commands.set(command.data.name, command);
        }
    }
}

module.exports = handleCommands;