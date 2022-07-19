# baloo-bot
a multi-purpose discord bot made using [discord.js](https://github.com/discordjs/discord.js) and [discord-player](https://github.com/Androz2091/discord-player)

## auto-deployment
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/996as/baloo-bot)

## features
- a dedicated welcome banner system, lockdown system, afk system, role menu system
- fully-featured music system with lyrics search (yt, soundcloud, spotify)
- makes use of slash commands, buttons and select menus
- an array of commands; misc, moderation, reaction roles, information etc

## manual installation

### requirements
- node.js (v16.6>)
- npm

### initialisation
- create a discord bot application [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- clone the bot project using below command
```bash
git clone https://github.com/996as/baloo-bot
```

- open terminal in project directory, and enter below command
```sh
npm i #install dependencies from package.json
```

### configuration
- create a .env file in the project directory and fill in the following attribute-value combinations

| Attribute            | Type     | Description                          |
| :------------------- | :------- | :----------------------------------- |
| `TOKEN`              | `string` | bot token (disc dev portal)          |
| `WELCOME_CHANNEL_ID` | `string` | ID of welcome channel in guild       |
| `CLIENT_ID`          | `string` | `APPLICATION_ID` in disc dev portal  |
| `GUILD_ID`           | `string` | ID of guild                          |
| `MONGOOSE_STRING`    | `string` | mongodb database string              |

### deployment
- deploy bot using below command
```sh
npm run start
```
