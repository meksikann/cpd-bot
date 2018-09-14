import {logInfo} from "../utils/logger";
import config from "../config";

var moment = require('moment');

let calendarsIds = process.env.NODE_ENV == 'production' ? config.productionCalendarIds :
    config.developmentCalendarIds;

function getDateISOString(time, duration, unit, isAdd) {
    if (isAdd) {
        return moment(time).add(duration, unit).format();
    }

    return moment(time).subtract(duration, unit).format();
}


//choose which calendar ID user wants to use.
function getCalendarId(roomName) {
    logInfo('process.env.NODE_ENV ', process.env.NODE_ENV);
    logInfo('Choose calendar id.Room name: ', roomName);
    let id;

    switch (roomName) {
        case 'first conference room':
            id = calendarsIds.mainRoom;
            break;
        case 'second conference room':
            id = calendarsIds.secondRoom;
            break;
    }

    return id;
}

function aggregateCalendarIds(roomName) {
    let items = [];

    //if room name defined find aggregate data for specified room, else aggregate data for all existing rooms;
    if (roomName) {
        const id = getCalendarId(roomName);
        if (id) {
            items.push({
                "id": id
            })
        }

        return items;
    }

    for (const [key, value] of Object.entries(calendarsIds)) {
        logInfo(`generated freebusy* data for ${key} calendar `);
        items.push({
            "id": value
        })
    }

    return items;
}

export {getDateISOString, getCalendarId, aggregateCalendarIds}
