const axios = require('axios');
const Canvas = require('canvas');
const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const { getCardUrl } = require('../../utils');

class TwoManCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: '2man',
			group: 'cards',
			memberName: '2man',
			description: 'Show 2 cards.',
			aliases: ['2']
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
		global.mixpanel.track('2man', {
			card1Url,
			card2Url,
			player1searchText: player1,
			player2searchText: player2,
			success: true,
			username: message.author.username,
			distinct_id: message.author.id,
			app: 'discord'
		});

		const canvas = Canvas.createCanvas(750 * 2, 1050);
		const ctx = canvas.getContext('2d');
		const player1Image = await Canvas.loadImage(card1Url);
		const player2Image = await Canvas.loadImage(card2Url);
		ctx.drawImage(player1Image, 0, 0, 750, 1050);
		ctx.drawImage(player2Image, 750, 0, 750, 1050);
		message.channel.send(new Discord.Attachment(canvas.toBuffer(), '2man.png') ).catch(console.error);
	}
}

module.exports = TwoManCommand;
