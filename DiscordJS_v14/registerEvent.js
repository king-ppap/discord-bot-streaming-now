import { Events } from "discord.js";
import interaction from "./events/interaction.js";
import listenStreamerLive from "./events/listenStreamerLive.js";

function registerEvent(client) {
  client.on(Events.PresenceUpdate, listenStreamerLive);
  client.on(Events.InteractionCreate, (e) => interaction(e, client));
}

export default registerEvent;
