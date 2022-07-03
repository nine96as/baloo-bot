//when bot is started, throws message to confirm
module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`logged in as ${client.user.tag}.`);
        client.user.setActivity("some goofy bear stuff", {type: "PLAYING"})
    }
}