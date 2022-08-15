import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    guildId: String,
    userId: String,
    status: String,
    time: String,
});

export const afkModel = mongoose.model('afk', Schema);
