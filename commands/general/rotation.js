const axios = require('axios');
const Canvas = require('canvas');
const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const { Client, MessageAttachment } = require('discord.js');

// TODO: Move this to a service
function getCardUrl(searchText) {
	const fileName = searchText.replace(/[^a-z0-9+]+/gi, '').toLowerCase();
	return `${process.env.CARDS_URL}/${fileName}.png`;
}

class FindCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'find2',
			group: 'general',
			memberName: 'find2',
			description: 'Finds Clutch Baseball cards.',
			aliases: ['ff']
		});
	}

	async run(message, searchText) {
		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext('2d');
	
		// Since the image takes time to load, you should await it
		const background = await Canvas.loadImage('https://cards.clutchbaseball.com/17toronotocentre.png');
		// This uses the canvas dimensions to stretch the image onto the entire canvas
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		// Use helpful Attachment class structure to process the file for you
		let attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

		console.log('m', attachment);
		//return message.channel.send(`Welcome to the server, user!`, attachment);
		//attachment = new MessageAttachment('https://cards.clutchbaseball.com/17toronotocentre.png');
		
		// Send the attachment in the message channel
		message.channel.send('memo', attachment);
	}
}

module.exports = FindCommand;
