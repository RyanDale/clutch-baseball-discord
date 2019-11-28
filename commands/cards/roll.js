const Commando = require('discord.js-commando');

class RollCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'roll',
			group: 'cards',
			memberName: 'roll',
			description: 'Roll die. Example: /r d20 + 4 rolls a random number between 1 and 20 and adds 4',
			aliases: ['r']
		});
	}

	async run(message, searchText) {
		const [roll, add] = searchText.split('+');
		const parsedRoll = parseInt(roll.replace(/[^0-9]/gi, ''), 10); 
		const parsedAdd = parseInt(add || 0, 10);
		const dieRoll = Math.floor(Math.random() * parsedRoll) + 1;
		const output = add ? `rolled a ${dieRoll} + ${parsedAdd} = ${dieRoll + parsedAdd}` : `rolled a ${dieRoll}`;
		return message.reply(output);
	}
}

module.exports = RollCommand;
