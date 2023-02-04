import { Client, Events, Collection, GatewayIntentBits } from 'discord.js';
import readCommandsFile from './utils/readCommandsFile.js';
import registerEvent from './registerEvent.js';
import { CONFIG } from './config/config.js';

global.ENV = CONFIG;
console.log(global.ENV);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const setup = async () => {
}
await setup();

client.commands = new Collection();
const commands = await readCommandsFile('commands');
console.log(commands);
for (const command of commands) {
  console.log(`Command: "${command.data.name}" loaded!`);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

registerEvent(client);

client.login(global.ENV.BOT_TOKEN);
