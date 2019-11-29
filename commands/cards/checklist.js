const Commando = require('discord.js-commando');

class ChecklistCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'checklist',
			group: 'cards',
			memberName: 'checklist',
			description: 'Gets the Clutch Baseball checklist.',
			aliases: []
		});
	}

	async run(message) {
		const checklistUrl = `${process.env.CARDS_URL}/checklist.pdf`;
        message.channel.send('Clutch Baseball Checklist', {
            files: [ checklistUrl ]
        });
        global.mixpanel.track('get checklist', {
            success: true,
            username: message.author.username,
            distinct_id: message.author.id,
            app: 'discord'
        });
	}
}

module.exports = ChecklistCommand;
