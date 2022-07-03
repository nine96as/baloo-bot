const fs = require("node:fs");
let commandCount = 0;
let buttonCount = 0;
let menuCount = 0;

const handleInteractions = (client) => {
    const commands = fs.readdirSync(`./commands`);
    
    for (const module of commands) {
        const commandFiles = fs
            .readdirSync(`./commands/${module}`)
            .filter(file => file.endsWith(".js"));

        for (const file of commandFiles) {
            commandCount++;
            const command = require(`../commands/${module}/${file}`);
            //set new item in collection
            //key as command name, value as exported module
            client.commands.set(command.data.name, command);
        }
    }

    const buttons = fs.readdirSync(`./buttons`);

    for (const module of buttons) {
        const buttonFiles = fs
            .readdirSync(`./buttons/${module}`)
            .filter(file => file.endsWith(".js"));

        for (const file of buttonFiles) {
            buttonCount++;
            const button = require(`../buttons/${module}/${file}`);
            //set new item in collection
            //key as button name, value as exported module
            client.buttons.set(button.name, button);
        }
    }

    const menus = fs.readdirSync(`./menus`);

    for (const module of menus) {
        const menuFiles = fs
            .readdirSync(`./menus/${module}`)
            .filter(file => file.endsWith(".js"));

        for (const file of menuFiles) {
            menuCount++;
            const menu = require(`../menus/${module}/${file}`);
            //set new item in collection
            //key as menu name, value as exported module
            client.menus.set(menu.name, menu);
        }
    }

    console.log(`${commandCount} command(s) loaded.`);
    console.log(`${buttonCount} button(s) loaded.`);
    console.log(`${menuCount} menu(s) loaded.`);
}

module.exports = handleInteractions;