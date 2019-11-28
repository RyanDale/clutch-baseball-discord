const Commando = require('discord.js-commando');

const welcomeMessage = '\n• There are a variety of channels you can join using the Channels (+) button on the left. \
They are broken up into 3 categories... Official Channels, Community Channels, and Field Channels.\n \
• There is a Clutch Baseball bot that has commands to trigger images from in channels.  DM the bot with `/help` for \
more information.\n • You can use the `/rules` command in Direct Messages with the bot or in Channels to see a variety \
of options for pulling info from the rulebook.\n • You can use the `/roll` command for rolls. For example, `/roll d20` \
for a d20, or adding in modifiers such as `/roll d20+5` will work as well.\n • For extra fun, use `/giphy` (whatever you \
want to see) to add some flair (or some salt) to your matchup.\n • You can play games via Direct Message, but for \
easier tracking (and to use the #rules feature), and so others can spectate, hop into any unused Field channel (like \
#field-1-one), and invite your opponent there.\n • Have fun! If you have any questions or need any help, ask in #nag-the-devs';

class WelcomeCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'welcome',
			group: 'general',
			memberName: 'welcome',
			description: 'Displays welcome message with information on how to use Discord.',
			aliases: ['w']
		});
	}

	async run(message, searchText) {
		return message.reply(welcomeMessage);
	}
}

module.exports = WelcomeCommand;
