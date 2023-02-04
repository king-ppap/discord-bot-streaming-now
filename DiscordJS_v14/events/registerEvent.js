import { Events } from "discord.js";
import interaction from "./interaction.js";
import listenStreamerLive from "./listenStreamerLive.js";

function registerEvent(client) {
  client.on(Events.PresenceUpdate, async (o, n) => listenStreamerLive(o, n));
  client.on(Events.InteractionCreate, (e) => interaction(e, client));
}

export default registerEvent;
