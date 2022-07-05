const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    guildId: String,
    channelId: String,
    time: String,
})

module.exports = mongoose.model("lockdown", Schema);