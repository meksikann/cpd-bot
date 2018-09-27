//setup builder global variable
let express = require('express');
import {logInfo} from "./utils/logger";
import HttpStatus from 'http-status-codes'
import bodyParser from 'body-parser';
import {generalConstants} from './constants/general';

// global.builder = require('botbuilder');
import {botGenerateUtter, botPerformAction} from './bot.js';

require('dotenv').config();

const server = express();
const port = 8282;

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
//setup server
server.listen(port, () => {
    logInfo(`${server.name} ${generalConstants.serverResponseMessages.listening} port ${port}`);
});

server.post('/webhook', botPerformAction);

server.post('/nlg', botGenerateUtter);

// simple request for balancer
server.post('/', (req, res, next) => {
    res.send(HttpStatus.OK)
});
