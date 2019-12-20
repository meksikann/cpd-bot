//setup builder global variable
require('dotenv').config();
let express = require('express');
let monk = require('monk');
import {logInfo} from "./utils/logger";
import HttpStatus from 'http-status-codes'
import bodyParser from 'body-parser';
import {generalConstants} from './constants/general';
import {botGenerateUtter, botPerformAction} from './bot.js';
import {startSentimentor} from "./sentiment";


let db = monk('localhost:27017/cpd-bot');
const server = express();
const port = 8282;

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

// Add headers
server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
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
server.get('/sentiment', async (req, res)=> {
    const reqText = req.query.text;
    console.log('got request:',req.query);
    const {text, score, magn} = await startSentimentor(reqText);

    res.send({text, score, magn})
    }
);

// simple request for balancer
server.post('/', (req, res, next) => {
    res.send(HttpStatus.OK)
});
