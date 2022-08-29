/* eslint-disable no-unused-vars */
import { welcModel } from '../../models/welcome.js';
import { welcSystem } from '../../systems/welcomeSystem.js';

// new member welcome message
export const name = 'guildMemberAdd';

export async function execute(member) {
    const { guild } = member;

    const data = await welcModel
        .findOne({ guildId: guild.id })
        .catch((err) => {});
    if (!data) return;

    if (data.channelId !== null) {
        const channel = guild.channels.cache.get(data.channelId);

        // if there is no welc channel, nothing to be done
        if (!channel) return;

        // otherwise create and send welcome banner
        const img = await welcSystem(member);

        channel.send({
            content: `<@${member.id}> hope you enjoy ur stay!`,
            files: [img],
        });
    }
}
