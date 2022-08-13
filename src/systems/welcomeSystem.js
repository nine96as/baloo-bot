import { createCanvas, loadImage } from 'canvas'
import { AttachmentBuilder } from 'discord.js'

const background = 'https://i.imgur.com/8Z1KB2g.jpg'

const dim = {
    height: 675,
    width: 1200,
    margin: 50,
}

const av = {
    size: 256,
    x: 480,
    y: 170,
}

//TODO fix welcome banner - big time

export const welcSystem = async (member) => {
    const username = member.user.username
    const discrim = member.user.discriminator
    const avatarURL = member.user.displayAvatarURL({
        format: 'png',
        dynamic: false,
        size: av.size,
    })

    const canvas = createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext('2d')

    // draw in the background
    const backgroundImg = await loadImage(background)
    ctx.drawImage(backgroundImg, 0, 0)

    // draw black tinted box
    ctx.fillStyle = 'rgba(0,0,0,0.8)'
    ctx.fillRect(
        dim.margin,
        dim.margin,
        dim.width - 2 * dim.margin,
        dim.height - 2 * dim.margin
    )

    const avImg = await loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(
        av.x + av.size / 2,
        av.y + av.size / 2,
        av.size / 2,
        0,
        Math.PI * 2,
        true
    )
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avImg, av.x, av.y)
    ctx.restore()

    // write in text
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'

    // draw in welcome img
    ctx.font = '50px Inter'
    ctx.fillText('welcome', dim.width / 2, dim.margin + 70)

    // draw in username
    ctx.font = '60px Inter'
    ctx.fillText(
        username + '#' + discrim,
        dim.width / 2,
        dim.height - dim.margin - 125
    )

    // draw in to the server
    ctx.font = '40px Inter'
    ctx.fillText('to the server', dim.width / 2, dim.height - dim.margin - 50)

    const attachment = new AttachmentBuilder()
        .setFile(canvas.toBuffer())
        .setName('welcome.png')
    return attachment
}