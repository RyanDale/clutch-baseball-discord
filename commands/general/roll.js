const Commando = require('discord.js-commando');

class RollCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'roll',
			group: 'general',
			memberName: 'roll',
			description: 'Roll die. Example: /r 20 rolls a random number between 1 and 20',
			aliases: ['r']
		});
	}

	async run(message, searchText) {
		const dieRoll = Math.floor(Math.random() * parseInt(searchText, 10)) + 1;
		return message.reply(`rolled a ${dieRoll}`);
	}
}

module.exports = RollCommand;
