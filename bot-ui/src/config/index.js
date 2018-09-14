let mongoist  = require('mongoist');

let config = {
    db: mongoist('mongodb://127.0.0.1:27017/cpd-bot'),
    rasaParseUrl: 'http://localhost:5005/conversations/',
    rasaContinueUrl: 'http://localhost:5005/conversations/',

    developmentCalendarIds: {
        mainRoom: 'eliftech.com_f8rsjijoarsi9stp76gslhv9ek@group.calendar.google.com',
        secondRoom: 'eliftech.com_os8ir07e7uqleh3jmid199q9l0@group.calendar.google.com'
    },
    productionCalendarIds: {
        mainRoom: 'eliftech.com_92gsu525ed2rrfotqfcd23vnk4@group.calendar.google.com',
        secondRoom: ''
    }
};


module.exports = config;
