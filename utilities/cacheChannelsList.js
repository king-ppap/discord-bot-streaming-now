function readCacheChannels(state) {
  const channelID = state.member.voice.channel.id;
  const userID = state.userID;
  let channel = global.cacheChannelsList[channelID]

  let isStremingOldStateTemp = false;
  let isCanChangeName = true;
  if (!channel) {
    channel = {
      [userID]: {
        stream: false,
      },
    };
    global.cacheChannelsList[channelID] = channel;
    global.cacheChannelsList[channelID].isCanChangeName = true;
  } else {
    isStremingOldStateTemp = channel[userID]?.stream;
    isCanChangeName = channel[userID]?.isCanChangeName;
  }
  console.log(global.cacheChannelsList);
  return {
    channelID,
    userID,
    isStremingOldStateTemp,
    isCanChangeName,
  }
}

export default readCacheChannels;