require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

// Load .env
let userList = process.env.USER_WISHLIST.split(',');
if (!Array.isArray(userList)) {
  console.error("Please set USER_WISHLIST")
  return
}
console.log(userList);

// Glo
var isCanChangeName = true
var tempChannelsList = {}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if (msg.content === 'k!reset') {
    // msg.reply('pong');
    const isInVoice = msg.member?.voice.channel?.name;
    const isChannelChangedName = isInVoice.match(/(\[On Air 🔴\] - )/gu)
    if (!isChannelChangedName) {
      msg.reply("ไม่ต้องรีเซ็ต");
      return
    }
    if (isInVoice) {
      msg.react('⌛')
      if (!isCanChangeName) {
        console.error("Can not Change Name, Maybe rate limit.");
        msg.reply("Can not Change Name, Maybe rate limit. รอก่อนนะ");
        return
      }


      await changeChannel(msg, isInVoice.replace(/(\[On Air 🔴\] - )/gu, ''))
    }
    msg.reply("Reset name")
    msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
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
  // const isStremingOldState = oldState.member?.presence.activities.find(e => e.type === 'STREAMING');
  const isStremingNewState = newState.member?.presence.activities.find(e => e.type === 'STREAMING');
  // console.log(isOnline);
  // console.log(isInVoice);

  // console.log('--------------isStremingOldState----------------')
  // console.log(isStremingOldState);
  // console.log('--------------isStremingNewState----------------')
  // console.log(isStremingNewState);

  if (isOnline && isInVoice) {
    // Check channel name is now "on air"
    isStremingOldStateTemp = tempChannelsList[newState.userID]?.stream
    newState.member.voice.channel.setName(`[On Air 🔴] - ${isInVoice}`)
    const isChannelChangedName = isInVoice.match(/(\[On Air 🔴\] - )/gu)

    if (!isStremingOldStateTemp && isStremingNewState) {
      if (isChannelChangedName) return;
      console.log(`[On Air 🔴] in ${isInVoice}`);

      if (!isCanChangeName) {
        console.error("Can not Change Name, Maybe rate limit.");
        return
      }
      await changeChannel(newState, `[On Air 🔴] - ${isInVoice}`)
    } else if (isStremingOldStateTemp && !isStremingNewState) {
      console.log(`[Not stream now] in ${isInVoice}`);

      if (!isCanChangeName) {
        console.error("Can not Change Name, Maybe rate limit.");
        return
      }
      await changeChannel(newState, isInVoice.replace(/(\[On Air 🔴\] - )/gu, ''))
    }

    //  else if (!isChannelChangedName && isStremingNewState) {
    //   console.log(`[On Air 🔴] - When channel name not change - in ${isInVoice}`);
    //   await changeChannel(newState, `[On Air 🔴] - ${isInVoice}`)
    // }

    tempChannelsList[newState.userID] = {
      stream: isStremingNewState !== undefined,
    }

    console.log('--------------tempChannelsList----------------')
    console.log(tempChannelsList);

    isCanChangeName = true
  }
})

async function changeChannel(state, name) {
  isCanChangeName = false
  return await state.member.voice.channel.setName(name).then(e => {
    console.log(e);
    return e
  }).catch(error => {
    console.log(error);
    return error
  })
}

client.login(process.env.TOKEN);
