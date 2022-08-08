import * as fs from 'fs'
import AsciiTable from 'ascii-table'

const table = new AsciiTable().setHeading('event', 'status')

export const handleEvents = async (client) => {
    const events = fs.readdirSync(`./src/events`)

    for (const module of events) {
        // returns array of file names in given directory
        const eventFiles = fs
            .readdirSync(`./src/events/${module}`)
            .filter((file) => file.endsWith('.js'))

        switch (module) {
            case 'client':
                for (const file of eventFiles) {
                    const event = await import(`../events/${module}/${file}`)
                    /** "on" and "once" methods take event name and a callback function
                     * callback function takes arguments returned by respective event,
                     * collects them in args array using ... syntax */
                    if (event.once) {
                        client.once(event.name, (...args) =>
                            event.execute(...args, client)
                        )
                    } else {
                        client.on(event.name, (...args) =>
                            event.execute(...args, client)
                        )
                    }

                    table.addRow(file, '🟩')
                    continue
                }
                break
            case 'player':
                for (const file of eventFiles) {
                    const event = await import(`../events/${module}/${file}`)
                    /** when an event is triggered by player, takes arguments
                     * returned by event and collects them in args array using
                     * ... syntax */
                    client.player.on(
                        event.name,
                        async (...args) => await event.execute(...args)
                    )

                    table.addRow(file, '🟩')
                    continue
                }
                break
            default:
                break
        }
    }

    return console.log(table.toString(), '\n✅ | loaded events.')
}