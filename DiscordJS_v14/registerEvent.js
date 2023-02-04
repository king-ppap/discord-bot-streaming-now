import { Events } from "discord.js";
import listenStreamerLive from "./events/listenStreamerLive.js";

function registerEvent(client) {
  client.on(Events.PresenceUpdate, listenStreamerLive);
}

export default registerEvent;
