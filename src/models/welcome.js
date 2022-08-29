import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    guildId: String,
    channelId: String,
});

export const welcModel = mongoose.model('welcome', Schema);
