require('dotenv').config();
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
global.client = client;
client.commands = new Discord.Collection();

const config = require("./config.json");

// Requiring discord-buttons and binding it to the initialised client.
const disbut = require('discord-buttons')(client);
// const { MessageButton } = require("discord-buttons")

console.log("Load .env");
// Load .env
let userList = process.env.USER_WISHLIST.split(',');
if (!Array.isArray(userList)) {
  console.error("Please set USER_WISHLIST")
  return
}
console.log(userList);

console.log("Load commands");
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
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

const { listenStreamerLive } = require('./events/listenStreamerLive')
client.on('presenceUpdate', async (oldState, newState) => {
  listenStreamerLive(oldState, newState);
})

// client.on('error', error => {
//   console.error(error);
// })

client.on('rateLimit', rateLimit => {
  console.log('--------------rateLimit--------------');
  console.log(rateLimit);
})

client.on('disconnect', () => {
  console.log("Disconnected !!!");
})

client.login(process.env.TOKEN);
