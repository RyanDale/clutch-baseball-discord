const Canvas = require('canvas');
const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const { getCardFromSearch, CARD_HEIGHT, CARD_WIDTH } = require('../../utils');

class BenchCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'bench',
			group: 'general',
			memberName: 'bench',
			description: 'Builds a bench out of 4 cards',
			aliases: ['4man', '4']
		});
	}

	async run(message, searchText) {
		const players = searchText.split('&');
		if (players.length !== 4) {
			return message.reply('Expected 4 players, instead got ' + players.length);
		}
		const playerUrls = await Promise.all(players.map(async (player) => ({
			searchText: player,
			url: await getCardFromSearch(player)
		})));

		const notFound = playerUrls.find(player => !player.url);
		if (notFound) {
			return message.reply(notFound.searchText + ' not found!');
		}

		const canvas = Canvas.createCanvas(CARD_WIDTH * 4, CARD_HEIGHT);
		const ctx = canvas.getContext('2d');
		let cardImage;
		for (let i = 0; i < playerUrls.length; i++) {
			cardImage = await Canvas.loadImage(playerUrls[i].url);
			ctx.drawImage(cardImage, i * CARD_WIDTH, 0, CARD_WIDTH, CARD_HEIGHT);
		}
		global.mixpanel.track('bench', {
			players: players.join(', '),
			success: true,
			username: message.author.username,
			distinct_id: message.author.id,
			app: 'discord'
		});
		message.channel.send(new Discord.Attachment(canvas.toBuffer(), 'bench.png') );
	}
}

module.exports = BenchCommand;
