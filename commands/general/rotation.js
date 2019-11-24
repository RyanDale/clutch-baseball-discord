const Canvas = require('canvas');
const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const { getCardFromSearch, CARD_HEIGHT, CARD_WIDTH } = require('../../utils');

class RotationCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'rotation',
			group: 'general',
			memberName: 'rotation',
			description: 'Builds a rotation out of 5 cards',
			aliases: ['rot', '5man', '5']
		});
	}

	async run(message, searchText) {
		const players = searchText.split('&');
		if (players.length !== 5) {
			return message.reply('Expected 5 players, instead got ' + players.length);
		}
		const playerUrls = await Promise.all(players.map(async (player) => ({
			searchText: player,
			url: await getCardFromSearch(player)
		})));

		const notFound = playerUrls.find(player => !player.url);
		if (notFound) {
			return message.reply(notFound.searchText + ' not found!');
		}

		const canvas = Canvas.createCanvas(CARD_WIDTH * 5, CARD_HEIGHT);
		const ctx = canvas.getContext('2d');
		let cardImage;
		for (let i = 0; i < playerUrls.length; i++) {
			cardImage = await Canvas.loadImage(playerUrls[i].url);
			ctx.drawImage(cardImage, i * CARD_WIDTH, 0, CARD_WIDTH, CARD_HEIGHT);
		}
		message.channel.send(new Discord.Attachment(canvas.toBuffer(), 'rotation.png') );
	}
}

module.exports = RotationCommand;
