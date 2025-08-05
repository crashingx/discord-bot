const fs = require('fs')
const path = require('path')
const { REST, Routes } = require('discord.js')
const { log } = require('../functions/util')
const config = require('../data/config.json')

module.exports = async client => {
  const commands = []
  const basePath = path.join(__dirname, '../commands')

  for (const folder of fs.readdirSync(basePath)) {
    const files = fs.readdirSync(path.join(basePath, folder)).filter(f => f.endsWith('.js'))
    for (const file of files) {
      const cmd = require(path.join(basePath, folder, file))
      if (!cmd.name || !cmd.description || !cmd.execute) {
        log('error', `invalid command ${cmd?.name ? cmd.name : 'undefined'}`)
        continue
      }
      client.commands.set(cmd.name, cmd)
      commands.push({
        name: cmd.name, description: cmd.description,
        integration_types: cmd.global ? [0, 1] : [0], // 0 = global, 1 = guild
        contexts: cmd.global ? [0, 1, 2] : [0], // 0 = global, 1 = guild, 2 = user
        default_permission: true, 
        dm_permission: true, // true = allow in dms, false = disallow in dms
        type: 1, // 1 = slash command
        options: cmd.options || []
      })
      log('debug', `loaded command ${cmd.name}`)
    }
  }

  const rest = new REST({ version: '10' }).setToken(config.discord.token)

  await rest.put(Routes.applicationCommands(config.discord.id), { body: commands })
    .then(() => {
      log('info', `${commands.length} commands registered globally`)
      log('debug', `commands ~ ${commands.map(cmd => cmd.name).join(', ')}`)
    })
    .catch(error => log('error ~ ', error))
}
