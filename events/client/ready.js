const { log } = require('../../functions/util')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        log('info', `logged in as ${client.user.tag}!`)
    }
}
