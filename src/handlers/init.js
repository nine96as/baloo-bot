import {REST} from '@discordjs/rest';
import {Routes} from 'discord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const TOKEN = process.env.TOKEN;
const MONGOOSE_STRING = process.env.MONGOOSE_STRING;

export const init = (client) => {
  const commandsData = [
    ...Array.from(client.commands.values()).map((c) =>
      c.data.toJSON(),
    ),
  ];

  const rest = new REST({version: '10'}).setToken(TOKEN);

  (async () => {
    try {
      console.log('--- initialisation ---');
      console.log('refreshing application (/) commands.');
      await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
          {body: commandsData},
      );
      console.log('successfully reloaded application (/) commands.');
      mongoose
          .connect(MONGOOSE_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
          })
          .then(() => console.log('✅ | connected to mongodb.'));
    } catch (e) {
      console.error(e);
    }
  })();
};
