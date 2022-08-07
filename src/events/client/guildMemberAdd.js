/* eslint-disable require-jsdoc */
import {generateImage} from '../../generateImage.js';

// new member welcome message
export const name = 'guildMemberAdd';

export async function execute(member) {
  const welcomeChannel = member.guild.channels.cache
      .get(process.env.WELCOME_CHANNEL_ID);
  const img = await generateImage(member);

  welcomeChannel.send({
    content: `<@${member.id}> welcome to the server!`,
    files: [img],
  });
}
