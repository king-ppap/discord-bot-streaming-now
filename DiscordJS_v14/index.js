// Require the necessary discord.js classes
import dotenv from 'dotenv';
dotenv.config();

global.env = {
  token: process.env.TOKEN,
};
console.log(global.env);

import { Client, Events, Collection, GatewayIntentBits } from 'discord.js';
import readCommandsFile from './utils/readCommandsFile.js';
import registerEvent from './registerEvent.js';

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

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

registerEvent(client);

client.login(global.env.token);
