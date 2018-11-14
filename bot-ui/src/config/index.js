let mongoist = require('mongoist');

let config = {
    db: mongoist('mongodb://127.0.0.1:27017/cpd-bot'),
    rasaParseUrl: 'http://localhost:5005/conversations/',
    rasaContinueUrl: 'http://localhost:5005/conversations/',

    developmentCalendarIds: {
        'factory': 'eliftech.com_f8rsjijoarsi9stp76gslhv9ek@group.calendar.google.com',
        'space': 'eliftech.com_os8ir07e7uqleh3jmid199q9l0@group.calendar.google.com'
    },
    productionCalendarIds: {
        'factory': 'eliftech.com_opr4uacf9vnofoacil689vpbh8@group.calendar.google.com',
        'space': 'eliftech.com_os8ir07e7uqleh3jmid199q9l0@group.calendar.google.com'
    },
    userTimeZone: "Europe/Kiev",
    minDurationAvailableMin: 30,
    freeSpaceSearchTimeRangeMins: 300,
    nlu_confidence: 0.4,
    slackChannel: 'slack',
    timeZone: 'Europe/Kiev'
};


module.exports = config;
