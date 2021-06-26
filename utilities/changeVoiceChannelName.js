
async function changeVoiceChannelName(state, name) {
  global.isCanChangeName = false
  console.log('changeVoiceChannelName');
  // testChannel.send(name)
  return await state.member.voice.channel.setName(name).then(newChannel => {
    console.log(`Channel's new name is ${newChannel.name}`);
    return newChannel
  }).catch(error => {
    console.log(error);
    return error
  })
}

module.exports.changeVoiceChannelName = changeVoiceChannelName;
