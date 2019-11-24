const axios = require('axios');
const Commando = require('discord.js-commando');
const { getCardUrl } = require('../../functions');

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
		const cardUrl = getCardUrl(searchText);
		try {
			await axios.get(cardUrl);
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
		} catch (error) {
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
