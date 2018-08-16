//setup builder global variable
import {logInfo} from "./utils/logger";

global.builder = require('botbuilder');
require('dotenv').config();

import restify from 'restify';
import HttpStatus from 'http-status-codes'
import {generalConstants} from './constants/general';
import {botCreate} from './bot.js';

let server = restify.createServer();

//setup server
server.listen(8282, () => {
    logInfo(`${server.name} ${generalConstants.serverResponseMessages.listening} ${server.url}`);
});

//create chat connector appId and appPassword are not needed when test on local bot-framework emulator
let connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// connector usage in bot creation method
botCreate(connector);

server.post('/api/messages', connector.listen());

// simple request for balancer
server.post('/', (req, res, next) => {
    res.send(HttpStatus.OK)
});
