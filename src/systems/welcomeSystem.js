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
        extension: 'png',
        size: av.size,
    });

    console.log(avatarURL);

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
        ctx.arc(
            av.x + av.size / 2,
            av.y + av.size / 2,
            av.size / 2,
            0,
            Math.PI * 2,
            true
        );        
        ctx.closePath();
        ctx.clip();

        //load av here
        await loadImage(avatarURL).then((img) => {
            ctx.drawImage(img, av.x, av.y);
        })
    })

    const attachment = new AttachmentBuilder()
        .setFile(canvas.toBuffer())
        .setName('welcome.png');
    return attachment;
};
