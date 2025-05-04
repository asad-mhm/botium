import { REST, Routes } from 'discord.js';

import dotenv from 'dotenv'
dotenv.config()

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!'
  },
  {
    name: 'marco',
    description: 'Replies with Polo!!'
  },
  {
    name: 'double',
    description: 'Replies with Cheesburger!'
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

import { Client, Events, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
  if (interaction.commandName === 'marco') {
    await interaction.reply('Polo!');
  }
  if (interaction.commandName === 'double') {
    await interaction.reply('Cheeseburger!');
  }
});

client.login(process.env.TOKEN);