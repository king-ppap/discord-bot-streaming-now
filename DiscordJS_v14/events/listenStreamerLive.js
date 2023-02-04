import changeVoiceChannelName from '../utils/changeVoiceChannelName.js';
import readCacheChannels from '../utils/cacheChannelsList.js';
import { ActivityType } from 'discord.js';

/*
--------------global.cacheChannelsList----------------
cacheChannelsList = {
  <Channels ID> : {
    isCanChangeName: <Boolean>
    <User ID> : {
      stream: <Boolean>
    }
  }
}
*/

function setCacheChannelsList(state, status) {
  global.cacheChannelsList[state.member.voice.channel.id].isCanChangeName =
    status;
}

async function listenStreamerLive(oldState, newState) {
  // Check User have role 'streamer'
  const isStremer = newState.member.roles.cache.find((role) =>
    global.ENV.SETTINGS.events.listenStreamerLiveRules.includes(
      role.name.toLocaleLowerCase()
    )
  );
  if (!isStremer) return;

  console.log(
    '------------------------------ presenceUpdate --------------------'
  );
  console.log(newState.user.username);
  if (!oldState || !newState) return;

  const isOnline = newState.member?.presence.status === 'online';
  const isInVoice = newState.member?.voice.channel?.name;
  // const isStremingOldState = oldState.member?.presence.activities.find(e => e.type === 'STREAMING');
  const isStremingNewState =
    newState.member?.presence.activities.find((e) => e.type === ActivityType.Streaming) !==
    undefined;
  console.log('listenStreamerLive isStremingNewState', isStremingNewState);

  // Check user has online and already in voice chat
  if (isOnline && isInVoice) {
    // Check channel name is now "on air"
    const { channelID, userID, isStremingOldStateTemp, isCanChangeName } =
      readCacheChannels(newState);

    // If user changed state from normal to streaming state.
    if (!isStremingOldStateTemp && isStremingNewState) {
      const isChannelChangedName = isInVoice.match(/(\[On Air 🔴\] - )/gu);

      // If already changed name; return.
      if (isChannelChangedName) return;
      console.log(`[On Air 🔴] in ${isInVoice}`);

      if (!isCanChangeName) {
        console.error('Can not Change Name, Maybe rate limit.');
        return;
      }

      setCacheChannelsList(newState, false);
      const isChangedName = await changeVoiceChannelName(
        newState,
        `[On Air 🔴] - ${isInVoice}`
      );
    } else if (isStremingOldStateTemp && !isStremingNewState) {
      console.log(`[Not stream now] in ${isInVoice}`);

      if (!isCanChangeName) {
        console.error('Can not Change Name, Maybe rate limit.');
        return;
      }

      setCacheChannelsList(newState, false);
      const isChangedName = await changeVoiceChannelName(
        newState,
        isInVoice.replace(/(\[On Air 🔴\] - )/gu, '')
      );
    }

    //  else if (!isChannelChangedName && isStremingNewState) {
    //   console.log(`[On Air 🔴] - When channel name not change - in ${isInVoice}`);
    //   await changeVoiceChannelName(newState, `[On Air 🔴] - ${isInVoice}`)
    // }

    global.cacheChannelsList[channelID][userID]['stream'] = isStremingNewState;

    console.log('--------------global.cacheChannelsList----------------');
    console.log(global.cacheChannelsList);
  }
}

export default listenStreamerLive;
