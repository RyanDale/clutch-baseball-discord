const Commando = require('discord.js-commando');
const { getCardFromSearch } = require('../../utils');

class FindCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'find',
			group: 'general',
			memberName: 'clutchbaseball',
			description: 'Finds Clutch Baseball cards.',
			aliases: ['f']
		});
	}

	async run(message, searchText) {
		const cardUrl = await getCardFromSearch(searchText);
		if (cardUrl) {
			message.channel.send(searchText, {
				files: [ cardUrl ]
			});
			global.mixpanel.track('findCard', {
				cardUrl,
				fileName: searchText,
				success: true,
				username: message.author.username,
				distinct_id: message.author.id,
				app: 'discord'
			});
		} else {
			global.mixpanel.track('findCard', {
				fileName: searchText,
				success: false,
				username: message.author.username,
				distinct_id: message.author.id,
				app: 'discord'
			});
			return message.reply(searchText + ' could not be found');
		}
	}
}

module.exports = FindCommand;
