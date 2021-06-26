import { MessageButton } from 'discord-buttons';

const run = async (client, message, args) => {
  let button = new MessageButton()
    .setLabel('ปุ่มโว้ยยยยย')
    .setStyle('blurple')
    .setID('button')
  await message.channel.send(`Ayo`, button);
}

export default {
  run,
  help: {
    name: "button",
    description: "ปุ่ม",
  },
}