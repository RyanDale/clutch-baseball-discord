const Commando = require('discord.js-commando');

class TopicCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'topic',
			group: 'general',
			memberName: 'topic',
			description: 'Get or set the channel topic.',
			aliases: ['t']
		});
	}

	async run(message, searchText) {
		if (searchText) {
			try {
				if (searchText === 'clear') {
					searchText = '';
				}
				await message.channel.setTopic(searchText);
				return message.reply(searchText ? 'Topic set to: ' + searchText : 'Topic cleared.');
			} catch (error) {
				return message.reply('Topic could not be set.');			
			}
		} else {
			return message.reply(message.channel.topic || 'No topic set!');
		}
	}
}

module.exports = TopicCommand;
