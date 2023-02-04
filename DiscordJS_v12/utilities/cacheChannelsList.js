function readCacheChannels(state, options = {}) {
  const { isFromCommand = false } = options;

  const channelID = state.member.voice.channel.id;

  const userID = isFromCommand ? state.author.id : state.userID;

  console.log('readCacheChannels', channelID, userID);

  let channel = global.cacheChannelsList[channelID];

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
    if (!channel[userID]) {
      global.cacheChannelsList[channelID] = channel;
      global.cacheChannelsList[channelID].isCanChangeName = true;
      channel = global.cacheChannelsList[channelID];
    }
    isStremingOldStateTemp = channel[userID]?.stream;
    isCanChangeName = channel.isCanChangeName;
  }
  console.log('readCacheChannels edited', global.cacheChannelsList);
  return {
    channelID,
    userID,
    isStremingOldStateTemp,
    isCanChangeName,
  };
}

export default readCacheChannels;
