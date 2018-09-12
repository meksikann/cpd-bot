import {logInfo} from "../utils/logger";
import config from "../config";

var moment = require('moment');

function getDateISOString(time, duration) {
    return moment(time).add(duration, 'minutes').format();
}


//choose which calendar ID user wants to use.
function getCalendarId(roomName) {
    logInfo('process.env.NODE_ENV ', process.env.NODE_ENV);
    logInfo('Choose calendar id.Rood name: ', roomName);
    let id;
    let calendarConfig  = process.env.NODE_ENV == 'production' ? config.productionCalendarIds :
        config.developmentCalendarIds;

    switch (roomName) {
        case 'first conference room':
            id = calendarConfig.mainRoom;
            break;
        case 'second conference room':
            id = calendarConfig.secondRoom;
            break;
        default:
            return ;
    }

    return id;
}

export { getDateISOString, getCalendarId }
