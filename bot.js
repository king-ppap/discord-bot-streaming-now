import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';

import Discord from 'discord.js';
const client = new Discord.Client();
const commands = new Discord.Collection();

import config from "./config.js";

// Requiring discord-buttons and binding it to the initialised client.
import disbut from 'discord-buttons';
disbut(client)


console.log('--------------- Load commands ---------------');
import readCommandsFile from './utilities/readCommandsFile.js';
client.commands = readCommandsFile('commands')

// Global
global.cacheChannelsList = {}
global.config = config;
global.env = {
  token: process.env.TOKEN,
};
console.log('--------------- Show global ---------------');
console.log(global);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activity: {
      type: "PLAYING",
      name: `${global.config.prefix}reset`,
    },
    status: 'online',
  }).catch(console.error);
});

// Command Manager
client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  // Check for prefix
  if (!cmd.startsWith(config.prefix)) return;

  cmd = cmd.slice(prefix.length);

  if (cmd === 'help') {
    console.log(client.commands)
  }

  let commandFile = client.commands.get(cmd);
  if (commandFile) commandFile.run(client, message, args);
});

client.on('clickButton', async (button) => {
  console.log(`button.id ${button.id}`);
  if (button.id === 'button') {
    button.reply.send(`${button.clicker.member} จะกดทำไมวะฮะ`);
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

client.login(global.env.token);
