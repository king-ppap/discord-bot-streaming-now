import changeVoiceChannelName from '../../utilities/changeVoiceChannelName.js';
import readCacheChannels from '../../utilities/cacheChannelsList.js';

async function run(client, message, args) {
  const isInVoice = message.member?.voice.channel?.name;

  if (isInVoice) {
    const isChannelChangedName = isInVoice.match(/(\[On Air 🔴\] - )/gu);
    if (!isChannelChangedName) {
      message.reply('ไม่ต้องรีเซ็ต');
      return;
    }
    message.react('⌛');

    console.log('run stream reset command', message);
    const { channelID, userID, isStremingOldStateTemp, isCanChangeName } =
      readCacheChannels(message, { isFromCommand: true });

    console.log('isCanChangeName', isCanChangeName);

    if (!isCanChangeName) {
      console.error('Can not Change Name, Maybe rate limit.');
      message.reply('รอก่อนนะ');
      message.reactions
        .removeAll()
        .catch((error) => console.error('Failed to clear reactions: ', error));
      return;
    }
    const isChangedName = await changeVoiceChannelName(
      message,
      message.member?.voice.channel?.name.replace(/(\[On Air 🔴\] - )/gu, '')
    );
    message.reply('เปลี่ยนชื่อให้ละ');
  } else {
    message.reply('เข้าห้องก่อนดิ');
  }
  message.reactions
    .removeAll()
    .catch((error) => console.error('Failed to clear reactions: ', error));
}

export default {
  run,
  help: {
    name: 'reset',
    description: 'Reset voice channel name.',
  },
};
