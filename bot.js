import * as dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';

import * as Discord from 'discord.js';
const client = new Discord.Client();
global.client = client;
client.commands = new Discord.Collection();

import config from "./config.js";

// Requiring discord-buttons and binding it to the initialised client.
import * as disbut from 'discord-buttons';
disbut.default(client)
// const { MessageButton } = require("discord-buttons")

console.log("Load .env");
// Load .env
let userList = process.env.USER_WISHLIST.split(',');
if (!Array.isArray(userList)) {
  console.error("Please set USER_WISHLIST")
  process.exit(1);
}
console.log(userList);

console.log("Load commands");
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    process.exit(1);
  }

  jsfile.forEach(async (f, i) => {
    let props = await import(`./commands/${f}`);
    console.log(props.default);
    console.log(`${f} loaded!`);
    client.commands.set(props.default.help.name, props.default);
  });

});

// Global
global.isCanChangeName = true
global.isCanChangeName = {}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activity: {
      type: "PLAYING",
      name: "k!reset",
    },
    status: 'online',
  }).catch(console.error);
  // testChannel = client.channels.cache.get('856929341329113121')
});

//Command Manager
client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //Check for prefix
  if (!cmd.startsWith(config.prefix)) return;

  let commandFile = client.commands.get(cmd.slice(prefix.length));
  console.log(commandFile);
  if (commandFile) commandFile.run(client, message, args);
});

client.on('clickButton', async (button) => {
  console.log('------------------------------ปุ่มมา------------------------------')
  console.log(`button.id ${button.id}`);
  if (button.id === 'button') {
    button.reply.send(`${button.clicker.member} จะกดทำไมวะฮะ`)
  }
});

import listenStreamerLive from './events/listenStreamerLive.js';
client.on('presenceUpdate', async (oldState, newState) => {
  listenStreamerLive(oldState, newState);
})

client.on('error', error => {
  console.error(error);
})

client.on('rateLimit', rateLimit => {
  console.log('--------------rateLimit--------------');
  console.log(rateLimit);
})

client.on('disconnect', () => {
  console.log("Disconnected !!!");
})

client.login(process.env.TOKEN);
