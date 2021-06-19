require('dotenv').config();
const Discord = require('discord.js');


const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate
client.on('voiceStateUpdate', (oldState, newState) => {
  console.log("----------------------------------------------");
  // console.log(newState.guild.voiceStates.guild.channels);
  console.log(newState.streaming);
  console.log(newState.channelID);
})

client.login(process.env.TOKEN);
