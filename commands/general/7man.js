const Canvas = require('canvas');
const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const { getCardFromSearch, CARD_HEIGHT, CARD_WIDTH } = require('../../utils');

class SevenManCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: '7man',
			group: 'general',
			memberName: '7man',
			description: 'Builds a set out of 7 cards',
			aliases: ['7']
		});
	}

	async run(message, searchText) {
		const players = searchText.split('&');
		if (players.length !== 7) {
			return message.reply('Expected 7 players, instead got ' + players.length);
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
		global.mixpanel.track('7man', {
			players: players.join(', '),
			success: true,
			username: message.author.username,
			distinct_id: message.author.id,
			app: 'discord'
		});
		message.channel.send(new Discord.Attachment(canvas.toBuffer(), '7man.png') );
	}
}

module.exports = SevenManCommand;
