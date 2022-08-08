import { REST } from '@discordjs/rest'
import { Routes } from 'discord.js'
import * as fs from 'fs'
import AsciiTable from 'ascii-table'
import dotenv from 'dotenv'

dotenv.config()

const clientID = process.env.clientID
const developerGuildID = process.env.developerGuildID
const token = process.env.token

const table = new AsciiTable().setHeading('command', 'status')

let commandsArray = []
let developerArray = []

export const handleCommands = async (client) => {
    const commands = fs.readdirSync(`./src/commands`)

    for (const module of commands) {
        const commandFiles = fs
            .readdirSync(`./src/commands/${module}`)
            .filter((file) => file.endsWith('.js'))

        for (const file of commandFiles) {
            const command = await import(`../commands/${module}/${file}`)
            
            // set new item in collection
            // key as command name, value as exported module
            client.commands.set(command.data.name, command)

            if (command.developer) {
                developerArray.push(command.data.toJSON())
            } else {
                commandsArray.push(command.data.toJSON())
            }

            table.addRow(file, '🟩')
            continue
        }
    }

    const rest = new REST({ version: '10' }).setToken(token)

    //loading of developer guild commands
    await rest.put(
        Routes.applicationGuildCommands(clientID, developerGuildID),
        { body: developerArray }
    )
    
    //loading of global commands
    await rest.put(
        Routes.applicationCommands(clientID),
        { body: commandsArray }
    )

    return console.log(table.toString(), '\n✅ | loaded (/) commands.')
}