const Canvas = require('canvas');
const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const { getCardUrl } = require('../../utils');

class QuickStartCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'quickstart',
			group: 'general',
			memberName: 'quickstart',
			description: 'Show the quickstart document.',
			aliases: []
		});
	}

	async run(message) {
		global.mixpanel.track('get quickstart', {
			success: true,
			username: message.author.username,
			distinct_id: message.author.id,
			app: 'discord'
		});

		const canvas = Canvas.createCanvas(750 * 2, 1050);
		const ctx = canvas.getContext('2d');
		const quickstartFront = await Canvas.loadImage(getCardUrl('quickstartfront'));
		const quickstartBack = await Canvas.loadImage(getCardUrl('quickstartback'));
		ctx.drawImage(quickstartFront, 0, 0, 750, 1050);
		ctx.drawImage(quickstartBack, 750, 0, 750, 1050);
		await message.channel.send(new Discord.Attachment(canvas.toBuffer(), 'quickstart.png'));
	}
}

module.exports = QuickStartCommand;
