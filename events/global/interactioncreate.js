const { log } = require('../../functions/util')
const config = require('../../data/config.json')

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {
        if (!interaction.isCommand()) return

        log('debug', `interactionCreate ~ ${interaction.commandName}`)
        const command = client.commands.get(interaction.commandName)

        if (!command) {
            log('debug', `command ${interaction.commandName} not found`)
            return
        }

        log('debug', `executing command ${interaction.commandName} for ${interaction.user.tag} | ${interaction.user.id} <${interaction.user.avatarURL() || "no avatar"}>`)

        if (command?.admin && !config?.admins.includes(interaction.user.id)) {
            log('debug', `command ${interaction.commandName} not allowed for ${interaction.user.tag} | ${interaction.user.id} <${interaction.user.avatarURL() || "no avatar"}>`)
            return interaction.reply({ content: "you do not have permission to use this command!", flags: 64 })
        }


        try {
            await command.execute(interaction)
            log('command', `executed command ${interaction.commandName} for ${interaction.user.tag} | ${interaction.user.id} <${interaction.user.avatarURL() || "no avatar"}>`)
        } catch (error) {
            log('error ~ ', error)
            return interaction.reply({ content: "an error occurred while executing this command!", flags: 64 })
        }
    }
}
