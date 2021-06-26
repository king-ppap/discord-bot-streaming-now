async function run(client, message, args) {
  const isInVoice = message.member?.voice.channel?.name;

  if (isInVoice) {
    const isChannelChangedName = isInVoice.match(/(\[On Air 🔴\] - )/gu)
    if (!isChannelChangedName) {
      message.reply('ไม่ต้องรีเซ็ต');
      return
    }
    message.react('⌛')
    if (!global.isCanChangeName) {
      console.error('Can not Change Name, Maybe rate limit.');
      message.reply('รอก่อนนะ');
      message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
      return
    }
    await changeNameChannel(message, message.member?.voice.channel?.name.replace(/(\[On Air 🔴\] - )/gu, ''))
    message.reply('Name has been reset.')
    global.isCanChangeName = true
  } else {
    message.reply('เข้าห้องก่อนดิ')
  }
  message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
};

export default {
  run,
  help: {
    name: 'reset',
    description: "Reset voice channel name.",
  }
}
