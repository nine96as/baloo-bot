import * as fs from "fs";

let eventCount = 0;
let playerCount = 0;
let commandCount = 0;
let buttonCount = 0;
let menuCount = 0;

export const handleBot = async (client) => {

    const events = fs.readdirSync(`./src/events`);

    for (const module of events) {
        //returns array of file names in given directory
        const eventFiles = fs
            .readdirSync(`./src/events/${module}`)
            .filter(file => file.endsWith(".js"));
    
        switch (module) {
            case "client":
                console.log(`--- loading events ---`);
                for (const file of eventFiles) {
                    eventCount++;
                    const event = await import(`../events/${module}/${file}`);
                    console.log(`-> loaded event ${event.name.toLowerCase()}`);
                    /* "on" and "once" methods take event name and a callback function
                    * callback function takes arguments returned by respective event,
                    * collects them in args array using ... syntax */
                    if (event.once) {
                        client.once(event.name, (...args) => event.execute(...args, client));
                    } else {
                        client.on(event.name, (...args) => event.execute(...args, client));
                    }
                }
                break;
            // case "player":
            //     console.log(`--- loading player events ---`);
    
            //     for (const file of eventFiles) {
            //         playerCount++;
            //         const {event} = await import(`../events/${module}/${file}`);
            //         console.log(`-> loaded player event ${event.name.toLowerCase()}`);
            //         /* when an event is triggered by player, takes arguments
            //         * returned by event and collects them in args array using
            //         * ... syntax */
            //         client.player.on(
            //             event.name,
            //             async (...args) => await event.execute(...args)
            //         )
            //     }
            //     break;
            default: 
                break;
        }
    }
    

    // console.log(`--- loading events ---`);
    
    // for (const file of eventFiles) {
    //     eventCount++;
    //     const {event} = require(`../events/${file}`);
    //     console.log(`-> loaded event ${event.name.toLowerCase()}`);
    //     /* "on" and "once" methods take event name and a callback function
    //     * callback function takes arguments returned by respective event,
    //     * collects them in args array using ... syntax */
    //     if (event.once) {
    //         client.once(event.name, (...args) => event.execute(...args, client));
    //     } else {
    //         client.on(event.name, (...args) => event.execute(...args, client));
    //     }
    // }

    // //returns array of file names in given directory
    // const playerFiles = fs
    //     .readdirSync(`./src/events/player`)
    //     .filter(file => file.endsWith(".js"));
    
    // console.log(`--- loading player events ---`);
    
    // for (const file of playerFiles) {
    //     playerCount++;
    //     const {event} = require(`../events/player/${file}`);
    //     console.log(`-> loaded player event ${event.name.toLowerCase()}`);
    //     /* when an event is triggered by player, takes arguments
    //     * returned by event and collects them in args array using
    //     * ... syntax */
    //     client.player.on(
	// 		event.name,
	// 		async (...args) => await event.execute(...args)
	// 	)
    // }

    const commands = fs.readdirSync(`./src/commands`);

    console.log(`--- loading commands ---`);
    
    for (const module of commands) {
        const commandFiles = fs
            .readdirSync(`./src/commands/${module}`)
            .filter(file => file.endsWith(".js"));

        for (const file of commandFiles) {
            commandCount++;
            const command = await import(`../commands/${module}/${file}`);
            //set new item in collection
            //key as command name, value as exported module
            client.commands.set(command.data.name, command);
            console.log(`-> loaded command ${command.data.name.toLowerCase()}`);
        }
    }

    const buttons = fs.readdirSync(`./src/buttons`);

    console.log(`--- loading buttons ---`);

    for (const module of buttons) {
        const buttonFiles = fs
            .readdirSync(`./src/buttons/${module}`)
            .filter(file => file.endsWith(".js"));

        for (const file of buttonFiles) {
            buttonCount++;
            const button = await import(`../buttons/${module}/${file}`);
            //set new item in collection
            //key as button name, value as exported module
            client.buttons.set(button.name, button);
            console.log(`-> loaded button ${button.name.toLowerCase()}`);
        }
    }

    const menus = fs.readdirSync(`./src/menus`);

    console.log(`--- loading menus ---`);

    for (const module of menus) {
        const menuFiles = fs
            .readdirSync(`./src/menus/${module}`)
            .filter(file => file.endsWith(".js"));

        for (const file of menuFiles) {
            menuCount++;
            const menu = await import(`../menus/${module}/${file}`);
            //set new item in collection
            //key as menu name, value as exported module
            client.menus.set(menu.name, menu);
            console.log(`-> loaded menu ${menu.name.toLowerCase()}`);
        }
    }

    console.log(`--- summary ---`);
    console.log(`${eventCount} event(s) loaded.`);
    console.log(`${playerCount} player event(s) loaded.`);
    console.log(`${commandCount} command(s) loaded.`);
    console.log(`${buttonCount} button(s) loaded.`);
    console.log(`${menuCount} menu(s) loaded.`);
}
