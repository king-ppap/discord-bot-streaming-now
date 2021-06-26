import readCommandsFile from '../utilities/readCommandsFile.js';

const commands = readCommandsFile('commands/stream')


async function run(client, message, args) {
  console.log(args);
  console.log(args.slice(2, 0));
  return commands.get(args[0]).run(client, message, args.slice(2))
}

export default {
  run,
  help: {
    name: 'stream',
    description: "คำสั่งเกียวกับ streamer",
  }
}