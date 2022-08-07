import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  guildId: String,
  channelId: String,
  time: String,
});

export const ldModel = mongoose.model('lockdown', Schema);
