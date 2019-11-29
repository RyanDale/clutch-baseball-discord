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
		const [roll, extra] = searchText.split(/[-+](.+)/)
		const operator = searchText.split('').find(character => character === '+' || character === '-') || '';
		const dieRoll = Math.floor(Math.random() * parseInt(roll.replace(/[^0-9]/gi, ''), 10)) + 1;
		const extraResult = eval(operator + extra) || 0;
		const result = dieRoll + extraResult;
		const output = operator ? `rolled a ${dieRoll} ${operator}${extra} = ${result}` : `rolled a ${dieRoll}`;
		return message.reply(output);
	}
}

module.exports = RollCommand;
