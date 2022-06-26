const fs = require("node:fs");
let count = 0;

//registers "events" path
const handlePlayerEvents = (client, filePath) => {
    //returns array of file names in given directory
    const eventFiles = fs
        .readdirSync(`${filePath}`)
        .filter(file => file.endsWith(".js"));
    
    for (const file of eventFiles) {
        count++;
        const event = require(`${filePath}/${file}`);
        /* when an event is triggered by player, takes arguments
        * returned by event and collects them in args array using
        * ... syntax */
        client.player.on(
			event.name,
			async (...args) => await event.execute(...args)
		)
    }

    console.log(`${count} player events loaded.`);
}

module.exports = handlePlayerEvents;