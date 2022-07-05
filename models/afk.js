const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    guildId: String,
    userId: String,
    status: String,
    time: String,
})

module.exports = mongoose.model("afk", Schema);