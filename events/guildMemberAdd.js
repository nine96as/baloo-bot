const generateImage = require("../generateImage");
const dotenv = require("dotenv");

dotenv.config();

const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;

//new member welcome message
module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        const img = await generateImage(member);
        member.guild.channels.cache.get(WELCOME_CHANNEL_ID).send({
           content: `<@${member.id}> welcome to the server!`,
           files: [img]
        })
    }
}