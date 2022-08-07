import mongoose from 'mongoose';

/**
 * roles structure
 * - roleId: string
 * - roleDescription: string
 * - roleEmoji: string
 */
const Schema = new mongoose.Schema({
  guildId: String,
  roles: Array,
});

export const rrModel = mongoose.model('reaction-roles', Schema);
