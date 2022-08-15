import 'dotenv/config'
import { EmbedBuilder } from 'discord.js'
// import { welcSystem } from '../../systems/welcomeSystem.js'

const { welcomeChannelID } = process.env

const background = 'https://i.imgur.com/0qoZELO.png'

// new member welcome message
export const name = 'guildMemberAdd'

export async function execute(member) {
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelID)

    const embed = new EmbedBuilder()
        .setColor('Random')
        .setAuthor({
            iconURL: member.user.displayAvatarURL(),
            name: member.user.tag,
        })
        .setThumbnail(member.guild.iconURL({ size: 2048 }))
        .setTitle('welcome to the server!')
        .setDescription(
            '- get your roles in #roles\n' + '- remember to read the #rules'
        )
        .setImage(background)
        .setTimestamp()

    welcomeChannel.send({
        embeds: [embed],
    })
    // const img = await welcSystem(member)

    // welcomeChannel.send({
    //     content: `<@${member.id}> welcome to the server!`,
    //     files: [img],
    // })
}
