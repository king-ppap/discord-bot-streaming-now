import readCacheChannels from '../../utilities/cacheChannelsList.js';

async function run(client, message, args) {
  console.log(message);
  message.reply(
    `
**global.cacheChannelsList**
\`\`\`json
${JSON.stringify(global.cacheChannelsList, null, 2)}
\`\`\`
**readCacheChannels**
\`\`\`json
${JSON.stringify(readCacheChannels(message, { isFromCommand: true }), null, 2)}
\`\`\`
`
  );
}

export default {
  run,
  help: {
    name: 'cache',
    description: 'Get cache data',
  },
};
