import { welcModel } from '../models/welcome.js';
import { createCanvas, loadImage, registerFont } from 'canvas';
import { AttachmentBuilder } from 'discord.js';

registerFont('../.fonts/Inter Desktop/Inter-Regular.otf', { family: 'inter-reg'});
registerFont('../.fonts/Inter Desktop/Inter-SemiBold.otf', { family: 'inter-semibold'});

const background = 'https://i.imgur.com/JZvY7Rl.jpg';

const dim = {
    height: 675,
    width: 1200,
    margin: 50,
};

const av = {
    size: 256,
    x: 480,
    y: 170,
};

export const welcSystem = async (member) => {
    const username = member.user.username;
    const discrim = member.user.discriminator;
    const memberCount = member.guild.memberCount;
    const avatarURL = member.user.displayAvatarURL({
        format: 'png',
        size: av.size,
    });

    const canvas = createCanvas(dim.width, dim.height);
    const ctx = canvas.getContext('2d');
    
    await loadImage(background).then(async (img) => {
        ctx.drawImage(img, 0, 0);

        // draw black tinted box
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(
            dim.margin,
            dim.margin,
            dim.width - 2 * dim.margin,
            dim.height - 2 * dim.margin
        );

        //load av here
        // const avImg = await loadImage(avatarURL);
        // ctx.save();

        // ctx.beginPath();
        // ctx.arc(
        //     av.x + av.size / 2,
        //     av.y + av.size / 2,
        //     av.size / 2,
        //     0,
        //     Math.PI * 2,
        //     true
        // );
        // ctx.closePath();
        // ctx.clip();
        // ctx.drawImage(avImg, av.x, av.y);
        // ctx.restore();

        //text stylings
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        
        //draw in 'welcome'
        ctx.font = '50px "inter-semibold"';
        ctx.fillText('welcome', dim.width / 2, dim.margin + 70);

        // draw in username
        ctx.font = '60px "inter-reg"';
        ctx.fillText(
            username + '#' + discrim,
            dim.width / 2,
            dim.height - dim.margin - 125
        );

        // draw in 'to the server'
        ctx.font = '40px "inter-semibold"';
        ctx.fillText(`you are the ${memberCount}th member`, dim.width / 2, dim.height - dim.margin - 50);

        ctx.beginPath();
        ctx.stroke();
        ctx.fill();
    })

    const attachment = new AttachmentBuilder()
        .setFile(canvas.toBuffer())
        .setName('welcome.png');
    return attachment;
};
