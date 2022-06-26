const fs = require("node:fs");
let count = 0;

//registers "commands" path
const handleCommands = (client, filePath) => {
    const commands = fs.readdirSync(`${filePath}/commands`)
    
    for (const module of commands) {
        const commandFiles = fs
            .readdirSync(`${filePath}/commands/${module}`)
            .filter(file => file.endsWith(".js"));

        for (const commandFile of commandFiles) {
            count++;
            const command = require(`${filePath}/commands/${module}/${commandFile}`);
            //set new item in collection
            //key as command name, value as exported module
            client.commands.set(command.data.name, command);
        }
    }

    console.log(`${count} commands loaded.`);
}

module.exports = handleCommands;