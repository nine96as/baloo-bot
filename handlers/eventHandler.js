const fs = require("node:fs");
let eventCount = 0;
let playerCount = 0;

const handleEvents = (client) => {
    //returns array of file names in given directory
    const eventFiles = fs
        .readdirSync(`./events`)
        .filter(file => file.endsWith(".js"));
    
    for (const file of eventFiles) {
        eventCount++;
        const event = require(`../events/${file}`);
        /* "on" and "once" methods take event name and a callback function
        * callback function takes arguments returned by respective event,
        * collects them in args array using ... syntax */
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }

    //returns array of file names in given directory
    const playerFiles = fs
        .readdirSync(`./events/player`)
        .filter(file => file.endsWith(".js"));
    
    for (const file of playerFiles) {
        playerCount++;
        const event = require(`../events/player/${file}`);
        /* when an event is triggered by player, takes arguments
        * returned by event and collects them in args array using
        * ... syntax */
        client.player.on(
			event.name,
			async (...args) => await event.execute(...args)
		)
    }

    console.log(`${eventCount} event(s) loaded.`);
    console.log(`${playerCount} player event(s) loaded.`);
}

module.exports = handleEvents;