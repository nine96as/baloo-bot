# baloo-bot

a multi-purpose discord bot made using [discord.js](https://github.com/discordjs/discord.js) and [discord-player](https://github.com/Androz2091/discord-player)

## auto-deployment

- you will have to configure environment variables; **check configuration section below**

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/996as/baloo-bot)
<br>
[![Open in Gitpod](https://camo.githubusercontent.com/76e60919474807718793857d8eb615e7a50b18b04050577e5a35c19421f260a3/68747470733a2f2f676974706f642e696f2f627574746f6e2f6f70656e2d696e2d676974706f642e737667)](https://gitpod.io/#https://github.com/996as/baloo-bot)

## features

-   a dedicated welcome banner system, lockdown system, afk system, role menu system
-   fully-featured music system with lyrics search (yt, soundcloud, spotify)
-   makes use of slash commands, buttons and select menus, context menus
-   an array of commands; misc, moderation, reaction roles, information etc

## manual installation

### requirements

-   node.js (v16.16>)
-   npm

### initialisation

-   create a discord bot application [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
-   clone the bot project using below command

```bash
git clone https://github.com/996as/baloo-bot
```

-   open terminal in project directory, and enter below command

```sh
npm i #install dependencies from package.json
```

### configuration
- create a .env file in the project directory and fill in the following attribute-value combinations

| attribute            | type     | description                          |
| :------------------- | :------- | :----------------------------------- |
| `TOKEN`              | `string` | bot token (disc dev portal)          |
| `WELCOME_CHANNEL_ID` | `string` | ID of welcome channel in guild       |
| `CLIENT_ID`          | `string` | `APPLICATION_ID` in disc dev portal  |
| `GUILD_ID`           | `string` | ID of guild                          |
| `MONGOOSE_STRING`    | `string` | mongodb database string              |

### deployment

-   deploy bot using below command

```sh
npm run start
```

### extras

-   prettier and eslint scripts are available to automate code formatting

```sh
npm run format:check #prettier checks formatting
npm run format:write #prettier enforces formatting
lint:check #eslint check
lint:fix #auto-fix errors
```

-   a nodemon script is available for instant restarts upon file changes

```sh
npm run start:dev #nodemon listens for file changes
```

