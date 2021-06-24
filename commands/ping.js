const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send('pong');
}

module.exports.help = {
  name: "ping"
}


// client.on('message', async msg => {
//   if (msg.content.startsWith('k!reset')) {
//     // msg.reply('pong');
//     const isInVoice = msg.member?.voice.channel?.name;

//     if (isInVoice) {
//       const isChannelChangedName = isInVoice.match(/(\[On Air 🔴\] - )/gu)
//       if (!isChannelChangedName) {
//         msg.reply('ไม่ต้องรีเซ็ต');
//         return
//       }
//       msg.react('⌛')
//       if (!isCanChangeName) {
//         console.error('Can not Change Name, Maybe rate limit.');
//         msg.reply('Can not Change Name, Maybe rate limit. รอก่อนนะ');
//         msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
//         return
//       }
//       await changeNameChannel(msg, msg.member?.voice.channel?.name.replace(/(\[On Air 🔴\] - )/gu, ''))
//       msg.reply('Name has been reset.')
//       isCanChangeName = true
//     } else {
//       msg.reply('เข้าห้องก่อนดิ')
//     }
//     msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
//   } else if (msg.content.startsWith('k!button')) {
//     let button = new MessageButton()
//       .setLabel('ปุ่มโว้ยยยยย')
//       .setStyle('blurple')
//       .setID('button')
//     await msg.channel.send(`Ayo`, button);
//   }
// });
