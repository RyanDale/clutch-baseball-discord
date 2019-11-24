const axios = require('axios');
const Canvas = require('canvas');
const Commando = require('discord.js-commando');
const Discord = require('discord.js');

// TODO: Move this to a service
function getCardUrl(searchText) {
	const fileName = searchText.replace(/[^a-z0-9+]+/gi, '').toLowerCase();
	return `${process.env.CARDS_URL}/${fileName}.png`;
}

class CompareCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'compare',
			group: 'general',
			memberName: 'clutchbaseballcompare',
			description: 'Compares Clutch Baseball cards.',
			aliases: ['c']
		});
	}

	async run(message, searchText) {
		const [player1, player2] = searchText.split('&');

		const card1Url = getCardUrl(player1);
		try {
			await axios.get(card1Url);
		} catch (error) {
			global.mixpanel.track('compareCard', {
				fileName: player1,
				success: false,
				username: message.author.username,
				distinct_id: message.author.id,
				app: 'discord'
			});
			return message.reply(player1 + ' could not be found');
		}
		const card2Url = getCardUrl(player2);
		try {
			await axios.get(card1Url);
		} catch (error) {
			global.mixpanel.track('compareCard', {
				fileName: searchText,
				success: player2,
				username: message.author.username,
				distinct_id: message.author.id,
				app: 'discord'
			});
			return message.reply(player2 + ' could not be found');
		}
		global.mixpanel.track('compareCard', {
			card1Url,
			card2Url,
			player1searchText: player1,
			player2searchText: player2,
			success: true,
			username: message.author.username,
			distinct_id: message.author.id,
			app: 'discord'
		});

		const canvas = Canvas.createCanvas(750 * 3, 1050);
		const ctx = canvas.getContext('2d');
		const player1Image = await Canvas.loadImage(card1Url);
		const player2Image = await Canvas.loadImage(card2Url);
		const background = await Canvas.loadImage('./assets/vs.png');
		ctx.drawImage(player1Image, 0, 0, 750, 1050);
		ctx.drawImage(background, 750, 0, 750, 1050);
		ctx.drawImage(player2Image, 750*2, 0, 750, 1050);
		message.channel.send(new Discord.Attachment(canvas.toBuffer(), 'compare.png') ).catch(console.error);
	}
}

module.exports = CompareCommand;
