import readCommandsFile from '../utilities/readCommandsFile.js';

const commands = readCommandsFile('commands/stream')

async function run(client, message, args) {
  return commands.get(args[0]).run(client, message, args.slice(2))
}

export default {
  run,
  commands: commands,
  help: {
    name: 'stream',
    description: "คำสั่งเกียวกับ streamer",
  }
}