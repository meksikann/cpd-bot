let mongoist  = require('mongoist');

let config = {
    db: mongoist('mongodb://127.0.0.1:27017/cpd-bot')
};

module.exports = config;
