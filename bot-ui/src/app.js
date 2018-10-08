//setup builder global variable
let express = require('express');
let monk = require('monk');
import {logInfo} from "./utils/logger";
import HttpStatus from 'http-status-codes'
import bodyParser from 'body-parser';
import {generalConstants} from './constants/general';
import {botGenerateUtter, botPerformAction} from './bot.js';
require('dotenv').config();

let db = monk('localhost:27017/cpd-bot');
const server = express();
const port = 8282;

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

server.use(function (req, res, next) {
    req.db = db;
    next();
});
//setup server
server.listen(port, () => {
    logInfo(`Bot action server ${generalConstants.serverResponseMessages.listening} port ${port}`);
});

// perform bot actions
server.post('/webhook', botPerformAction);
// generate bot messages
server.post('/nlg', botGenerateUtter);

// simple request for balancer
server.post('/', (req, res, next) => {
    res.send(HttpStatus.OK)
});
