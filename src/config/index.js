let mongoist  = require('mongoist');

let config = {
    db: mongoist('mongodb://127.0.0.1:27017/cpd-bot'),
    rasaParseUrl: 'http://localhost:5005/conversations/',
    rasaContinueUrl: 'http://localhost:5005/conversations/',
};

module.exports = config;
