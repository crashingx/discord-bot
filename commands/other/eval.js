
module.exports = {
    name: 'eval',
    description: 'evaluates code',
    options: [
        {
            name: 'code',
            type: 3, // string input
            description: 'code to evaluate',
            required: true
        }
    ],
    global: true,
    admin: true,
    async execute(interaction) {
      await interaction.reply({ content: 'evaluating...', flags: 64 });
  
      try {
        const code = interaction.options.getString('code');
        const result = eval(code);
        await interaction.editReply({ content: 'evaluated\n\n\`\`\`js\n' + result + '\n\`\`\`', flags: 64 });
      } catch (error) {
        await interaction.editReply({ content: 'error\n\n\`\`\`js\n' + error + '\n\`\`\`', flags: 64 });
      }
    }
  }
  