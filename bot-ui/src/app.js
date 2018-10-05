//setup builder global variable
let express = require('express');
import {logInfo} from "./utils/logger";
import HttpStatus from 'http-status-codes'
import bodyParser from 'body-parser';
import {generalConstants} from './constants/general';


var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/cpd-bot');

// global.builder = require('botbuilder');
import {botGenerateUtter, botPerformAction} from './bot.js';

require('dotenv').config();

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
    logInfo(`${server.name} ${generalConstants.serverResponseMessages.listening} port ${port}`);
});

server.post('/webhook', botPerformAction);

server.post('/nlg', botGenerateUtter);

// simple request for balancer
server.post('/', (req, res, next) => {
    res.send(HttpStatus.OK)
});
