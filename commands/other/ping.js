
module.exports = {
    name: 'ping',
    description: 'shows bot latency and api heartbeat, works in dms and groups',
    global: true,
    admin: false,
    async execute(interaction) {
      const start = Date.now();
      await interaction.reply({ content: 'pinging...', flags: 64 });
  
      await interaction.editReply({ content: `\` 🏓 \` pong\n**latency ~** ${Date.now() - start}ms\n**api heartbeat ~** ${interaction.client.ws.ping}ms`, flags: 64 });
    }
  }
  