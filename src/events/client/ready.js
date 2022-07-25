import {ldSystem} from "../../systems/lockdownSystem.js";

//when bot is started, throws message to confirm
export const name = "ready";

export async function execute(client) {
    console.log(`✅ | logged in as ${client.user.tag}.`);
    //TODO: figure out why this isn't working
    client.user.setActivity("🧸 | some goofy bear stuff", {type: "PLAYING"})
    //load up lockdown system
    ldSystem(client);
}