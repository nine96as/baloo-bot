import * as fs from 'fs';
import AsciiTable from 'ascii-table';

const table = new AsciiTable().setHeading('component', 'status');

export const handleComponents = async (client) => {
    const components = fs.readdirSync(`./src/interactions/components`);

    for (const component of components) {
        const componentFiles = fs.readdirSync(
            `./src/interactions/components/${component}`
        );

        switch (component) {
            case 'buttons':
                for (const module of componentFiles) {
                    const buttonFiles = fs
                        .readdirSync(
                            `./src/interactions/components/${component}/${module}`
                        )
                        .filter((file) => file.endsWith('.js'));

                    for (const file of buttonFiles) {
                        const button = await import(
                            `../interactions/components/${component}/${module}/${file}`
                        );
                        // set new item in collection
                        // key as button name, value as exported module
                        client.buttons.set(button.name, button);

                        table.addRow(file, '🟩');
                        continue;
                    }
                }
                break;
            case 'menus':
                for (const module of componentFiles) {
                    const menuFiles = fs
                        .readdirSync(
                            `./src/interactions/components/${component}/${module}`
                        )
                        .filter((file) => file.endsWith('.js'));

                    for (const file of menuFiles) {
                        const menu = await import(
                            `../interactions/components/${component}/${module}/${file}`
                        );
                        // set new item in collection
                        // key as menu name, value as exported module
                        client.menus.set(menu.name, menu);

                        table.addRow(file, '🟩');
                        continue;
                    }
                }
                break;
            case 'modals':
                for (const file of componentFiles) {
                    const modal = await import(
                        `../interactions/components/${component}/${file}`
                    );
                    client.modals.set(modal.name, modal);

                    table.addRow(file, '🟩');
                    continue;
                }
                break;
            default:
                break;
        }
    }

    return console.log(table.toString(), '\n✅ | loaded components.');
};
