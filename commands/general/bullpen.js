const Canvas = require('canvas');
const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const { getCardFromSearch, CARD_HEIGHT, CARD_WIDTH } = require('../../utils');

class BullpenCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'bullpen',
			group: 'general',
			memberName: 'bullpen',
			description: 'Builds a bullpen out of 8 cards',
			aliases: ['pen', '8man', '8']
		});
	}

	async run(message, searchText) {
		const players = searchText.split('&');
		if (players.length !== 8) {
			return message.reply('Expected 8 players, instead got ' + players.length);
		}
		const playerUrls = await Promise.all(players.map(async (player) => ({
			searchText: player,
			url: await getCardFromSearch(player)
		})));

		const notFound = playerUrls.find(player => !player.url);
		if (notFound) {
			return message.reply(notFound.searchText + ' not found!');
		}

		const canvas = Canvas.createCanvas(CARD_WIDTH * 4, CARD_HEIGHT * 2);
		const ctx = canvas.getContext('2d');
		let cardImage;
		let verticalPosition;
		for (let i = 0; i < playerUrls.length; i++) {
			cardImage = await Canvas.loadImage(playerUrls[i].url);
			verticalPosition = Math.floor(i / 4) * CARD_HEIGHT;
			ctx.drawImage(cardImage, (i % 4) * CARD_WIDTH, verticalPosition, CARD_WIDTH, CARD_HEIGHT);
		}
		global.mixpanel.track('bullpen', {
			players: players.join(', '),
			success: true,
			username: message.author.username,
			distinct_id: message.author.id,
			app: 'discord'
		});
		message.channel.send(new Discord.Attachment(canvas.toBuffer(), 'bullpen.png') );
	}
}

module.exports = BullpenCommand;
