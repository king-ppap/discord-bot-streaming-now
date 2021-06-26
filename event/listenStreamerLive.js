const { changeVoiceChannelName } = require('../utilities/changeVoiceChannelName')


async function listenStreamerLive(oldState, newState) {
  // Check User have role 'streamer'
  isStremer = newState.member.roles.cache.find(
    role => role.name.toLocaleLowerCase() === 'streamer'
  )
  if (!isStremer) return;

  console.log('------------------------------ presenceUpdate --------------------');
  console.log(newState.user.username);
  if (!oldState || !newState) return;

  const isOnline = newState.member?.presence.status === 'online';
  const isInVoice = newState.member?.voice.channel?.name;
  // const isStremingOldState = oldState.member?.presence.activities.find(e => e.type === 'STREAMING');
  const isStremingNewState = newState.member?.presence.activities.find(e => e.type === 'STREAMING') !== undefined;

  if (isOnline && isInVoice) {
    // Check channel name is now "on air"
    isStremingOldStateTemp = global.isCanChangeName[newState.userID]?.stream
    const isChannelChangedName = isInVoice.match(/(\[On Air 🔴\] - )/gu)

    if (!isStremingOldStateTemp && isStremingNewState) {
      if (isChannelChangedName) return;
      console.log(`[On Air 🔴] in ${isInVoice}`);

      if (!global.isCanChangeName) {
        console.error("Can not Change Name, Maybe rate limit.");
        return
      }
      await changeVoiceChannelName(newState, `[On Air 🔴] - ${isInVoice}`)
      global.isCanChangeName = true
    } else if (isStremingOldStateTemp && !isStremingNewState) {
      console.log(`[Not stream now] in ${isInVoice}`);

      if (!global.isCanChangeName) {
        console.error("Can not Change Name, Maybe rate limit.");
        return
      }
      await changeVoiceChannelName(newState, isInVoice.replace(/(\[On Air 🔴\] - )/gu, ''))
      global.isCanChangeName = true
    }

    //  else if (!isChannelChangedName && isStremingNewState) {
    //   console.log(`[On Air 🔴] - When channel name not change - in ${isInVoice}`);
    //   await changeVoiceChannelName(newState, `[On Air 🔴] - ${isInVoice}`)
    // }

    global.isCanChangeName[newState.userID] = {
      stream: isStremingNewState,
    }

    console.log('--------------global.isCanChangeName----------------')
    console.log(global.isCanChangeName);
  }
}

module.exports.listenStreamerLive = listenStreamerLive;
