const {VoiceState} = require("discord.js");

module.exports = {
    name: "voiceStateUpdate",
    /**
     * @param {VoiceState} oldState 
     * @param {VoiceState} newState 
     */
    async execute(oldState, newState, client) {
        const {member, guild} = newState;
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;
        const joinToCreate = "990653030368149665"

        //checks if the voice channel the user joined was the jtc channel
        if (oldChannel !== newChannel && newChannel.id === joinToCreate) {
            const voiceChannel = await guild.channels.create(member.user.tag, {
                type: "GUILD_VOICE",
                parent: newChannel.parent,
                permissionOverwrites: [
                    {id: member.id, allow: ["CONNECT"]},
                    {id: guild.id, deny: ["CONNECT"]}
                ]
            })

            client.voiceGenerator.set(member.id, voiceChannel.id);
            //after user joins jtc channel, places 30 second timeout on being able to join again
            await newChannel.permissionOverwrites.edit(member, {CONNECT: false});
            setTimeout(() => newChannel.permissionOverwrites.delete(member), 30 * 1000);

            //gives bot breathing room to complete other steps before moving member to jtc channel
            return setTimeout(() => member.voice.setChannel(voiceChannel), 500);
        }
    }
}