const fs = require("node:fs");
let count = 0;

//registers "events" path
const handleEvents = (client, filePath) => {
    //returns array of file names in given directory
    const eventFiles = fs
        .readdirSync(`${filePath}`)
        .filter(file => file.endsWith(".js"));
    
    for (const file of eventFiles) {
        count++;
        const event = require(`${filePath}/${file}`);
        /* "on" and "once" methods take event name and a callback function
        * callback function takes arguments returned by respective event,
        * collects them in args array using ... syntax */
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }

    console.log(`${count} events loaded.`);
}

module.exports = handleEvents;