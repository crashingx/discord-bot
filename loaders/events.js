
const fs = require('fs')
const path = require('path')
const { log } = require('../functions/util')

module.exports = async client => {
  const basePath = path.join(__dirname, '../events')

  for (const folder of fs.readdirSync(basePath)) {
    const files = fs.readdirSync(path.join(basePath, folder)).filter(f => f.endsWith('.js'))
    for (const file of files) {
      const evt = require(path.join(basePath, folder, file))
      client.events.set(evt.name, evt)
      client[evt.once ? 'once' : 'on'](evt.name, (...args) => {
        evt.execute(...args, client)
        if (evt.log || evt.log === undefined) {
          log('debug', `executed event ${evt.name}`)
        }
      })
    }
  }

  log('debug', `loaded ${client.events.size} events`)
}
