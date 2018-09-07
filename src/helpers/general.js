var moment = require('moment');

function getDateISOString(time, duration) {
    return moment(time).add(duration, 'minutes').format();
}

export { getDateISOString}
