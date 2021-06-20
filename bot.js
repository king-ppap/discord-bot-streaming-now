require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

let userList = process.env.USER_WISHLIST.split(',');
console.log(userList);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.on('presenceUpdate', async (oldState, newState) => {
  // Check User are in wishlist
  // TODO save to DB
  if (!userList.includes(newState.userID)) return;

  console.log('------------------------------ presenceUpdate --------------------');
  console.log(newState.user.username);
  if (!oldState || !newState) return;

  const isOnline = newState.member?.presence.status === 'online';
  const isInVoice = newState.member?.voice.channel?.name;
  const isStremingOldState = await oldState.member?.presence.activities.find(e => e.type === 'STREAMING');
  const isStremingNewState = await newState.member?.presence.activities.find(e => e.type === 'STREAMING');
  // console.log(isOnline);
  // console.log(isInVoice);

  console.log('--------------isStremingOldState----------------')
  console.log(isStremingOldState);
  console.log('--------------isStremingNewState----------------')
  console.log(isStremingNewState);

  if (isOnline && isInVoice) {
    // Check channel name is now "on air"
    // BUG new adn old are same state whY?
    if (!isStremingOldState && isStremingNewState) {
      if (isInVoice.match(/(\[On Air 🔴\] - )/gu)) return;
      console.log('[On Air 🔴]');
      newState.member.voice.channel.setName(`[On Air 🔴] - ${isInVoice}`)
    }
    if (isStremingOldState && !isStremingNewState) {
      console.log('[Not stream now]');
      const oldVoiceName = isInVoice.replace(/(\[On Air 🔴\] - )/ug, '')
      newState.member.voice.channel.setName(oldVoiceName)
    }
  }
})

client.login(process.env.TOKEN);
