const { 
  Client, 
  IntentsBitField, 
  ActivityType,
  Collection
} = require('discord.js')
const config = require('./data/config.json')
const { log } = require('./functions/util')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildInvites
  ],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
  presence: { activities: [{ name: '/notch', type: ActivityType.Watching }], status: 'idle' },
  failIfNotExists: true,
  http: { api: 'https://discord.com/api/v10', version: 'v10' },
  partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION'],
  closeTimeout: 30000
})

client.commands = new Collection()
client.events = new Collection()

require('./loaders/events')(client) 
require('./loaders/commands')(client)

client.login(config.discord.token).catch(error => {
  switch (true) {
    case error.message.includes("An invalid token was provided"):
    case error.message.includes("Expected token to be set for this request, but none was present."):
      log('error', `invalid token ~ ${(config.discord.token).slice(0, 15) + '...'}`)
      break
  }
})

process.on('unhandledRejection', (reason, promise) => {
  log('unhandled rejection ~ ', promise, 'reason ~ ', reason || 'no reason')
})

process.on('uncaughtException', error => {
  log('uncaught exception ~ ', error)
})
