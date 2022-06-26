const {SlashCommandBuilder} = require("@discordjs/builders");
const {Captcha} = require("captcha-canvas");
const {MessageAttachment} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("captcha")
        .setDescription("configure captcha"),
    async execute(interaction) {
        const captcha = new Captcha();
        captcha.async = true;
        captcha.addDecoy();
        captcha.drawTrace();
        captcha.drawCaptcha();

        const captchaAttachment = new MessageAttachment(
            await captcha.png,
            "captcha.png")
        
        interaction.editReply({
            files: [captchaAttachment],
            content: `code: ${captcha.text}`
        })
    }
}