let mongoist  = require('mongoist');

let config = {
    db: mongoist('mongodb://127.0.0.1:27017/cpd-bot'),
    rasaParseUrl: 'http://localhost:5005/conversations/',
    rasaContinueUrl: 'http://localhost:5005/conversations/',

    developmentCalendarIds: {
        'first_conference_room': 'eliftech.com_f8rsjijoarsi9stp76gslhv9ek@group.calendar.google.com',
        'second_conference_room': 'eliftech.com_os8ir07e7uqleh3jmid199q9l0@group.calendar.google.com'
    },
    productionCalendarIds: {
        'first_conference_room': 'eliftech.com_92gsu525ed2rrfotqfcd23vnk4@group.calendar.google.com',
        'second_conference_room': ''
    },
    userTimeZone: "Europe/Kiev",
    minDurationAvailableMin: 30,
    freeSpaceSearchTimeRangeMins: 180,
    nlu_confidence: 0.4

};


module.exports = config;
