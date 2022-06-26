const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");
const mongoose = require("mongoose");

const init = (client) => {
    const commandsData = [
        ...Array.from(client.commands.values()).map((c) => c.data.toJSON()),
    ]

    const rest = new REST({version: "9"}).setToken(process.env.TOKEN);

    (async () => {
        try {
            console.log("refreshing application (/) commands.");
            await rest.put(Routes
                .applicationGuildCommands(
                    process.env.CLIENT_ID, 
                    process.env.GUILD_ID), 
                    {body: commandsData})
            console.log("successfully reloaded application (/) commands.");
            mongoose.connect(process.env.MONGOOSE_STRING, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }).then(() => console.log("connected to mongodb."))
        } catch (e) {
            console.error(e);
        }
    })();
}

module.exports = init;
