const generateImage = require("../generateImage");

//new member welcome message
module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        const welcomeChannel = member.guild.channels.cache
            .get(process.env.WELCOME_CHANNEL_ID)
        const img = await generateImage(member);
        
        welcomeChannel.send({
           content: `<@${member.id}> welcome to the server!`,
           files: [img]
        })
    }
}