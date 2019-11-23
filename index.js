console.log('Init Clutch Baseball Bot')

require('dotenv').config();

const Commando = require('discord.js-commando');
const Mixpanel = require('mixpanel');
const path = require('path');

const client = new Commando.Client();

global.mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

client.registry
    .registerGroups([
        ['general', 'General']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(process.env.TOKEN);
