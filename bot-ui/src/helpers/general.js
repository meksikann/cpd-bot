import {logInfo} from "../utils/logger";
import {getUserPermissions} from './database-queries';
import config from "../config";
import moment from 'moment';
import {each, find} from 'lodash';


const user = 'user';
let calendarsIds = process.env.NODE_ENV == 'production' ? config.productionCalendarIds :
    config.developmentCalendarIds;

function getDateWithDurationISOString(time, duration, unit, isAdd) {
    if (isAdd) {
        return moment(time).add(duration, unit).format();
    }

    return moment(time).subtract(duration, unit).format();
}

//choose which calendar ID user wants to use.
function getCalendarId(roomName) {
    let id;

    logInfo('process.env.NODE_ENV ', process.env.NODE_ENV);
    logInfo('Choose calendar id.Room name: ', roomName);

    switch (roomName) {
        case config.room_names.first_conference_room:
            id = calendarsIds.first_conference_room;
            break;
        case config.room_names.second_conference_room:
            id = calendarsIds.second_conference_room;
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
                "id": id,
                "name": roomName
            })
        }

        return items;
    }

    for (const [key, value] of Object.entries(calendarsIds)) {
        logInfo(`generated freebusy* data for ${key} calendar `);
        items.push({
            "id": value,
            "name": key
        })
    }

    return items;
}

//note: config.minDurationAvailableMin is minimum acceptable time range
function getTimeRangeFreeSlots(start, end, events) {
    let freeSlots = [];
    let startTime = start;
    let endTime = end;

    events.forEach((event) => {
        let diffMin = moment(event.start.dateTime).diff(startTime, 'minutes');

        if (diffMin >= config.minDurationAvailableMin) {
            freeSlots.push(
                {
                    start: startTime,
                    end: event.start.dateTime
                }
            )
        }

        startTime = event.end.dateTime;
    });

    //find last free time range
    let lastDiffMin = moment(endTime).diff(startTime, 'minutes');

    if (lastDiffMin >= config.minDurationAvailableMin) {
        freeSlots.push(
            {
                start: startTime,
                end: endTime
            }
        )
    }

    return freeSlots;
}

function getDate(string) {
    if (string) {
        return moment(string).format('DD-MM-YYYY');
    }
    return moment().format('DD-MM-YYYY');
}

function getTime(string) {
    if (string) {
        return moment(string).format('HH:mm');
    }
    return moment().format('HH:mm');
}

function getTimeStamp() {
    return moment().format('DD-MM-YYYY HH:mm:ss');
}

// if asked time passed allready  = set time now.
function getQueriedValidTime(time) {
    if (time && (moment(time) > moment())) {
        return time;
    }

    logInfo('Passed time requested');
    return new Date().toISOString();
}

function getNormalizedDuration(data) {
    const durationName = 'duration';
    const extractorName = 'ner_duckling_http';
    let durationData = {};

    logInfo('getting duration entity from array: ');

    // get duration data normalized in seconds
    each(data.entities, ent => {
        if (ent.entity == durationName && ent.extractor == extractorName) {
            durationData.value = ent.additional_info.normalized.value;
            durationData.unit = ent.additional_info.normalized.unit + 's'; // for moment e.g. 'second' into 'seconds'
        }
    });

    return durationData
}

function geterateQueryData(nextActionData) {
    return {
        roomName: nextActionData.slots.room_name,
        time: getQueriedValidTime(nextActionData.slots.time),
        duration: nextActionData.slots.duration ? getNormalizedDuration(nextActionData) : {},
        normalized_duration: nextActionData.slots.normalized_duration
    };
}

function getNewsSlotsFromUtterance(data) {
    let newSlots = [];

    //if duration mentioned in utternace but not set slots value
    if (data.slots.duration && !data.slots.normalized_duration) {
        let durationData = getNormalizedDuration(data);

        if (durationData.value && durationData.unit) {
            newSlots.push(
                {"event": "slot", "name": "normalized_duration", "value": durationData.value},
            )
        }
    }

    return newSlots;
}

async function checkUserOfficeLocation(data) {
    let user = await getUserPermissions(data.senderId);

    // if permission has any office location, set auth slot to true
    if(user && user.feature_permissions && (user.feature_permissions[config.vinLocation.toLowerCase()] ||
        user.feature_permissions[config.vinLocation.toLowerCase()])) {
        return [
            {"event": "slot", "name": "auth_valid", "value": true}
            ]
    }

    return [{"event": "slot", "name": "auth_valid", "value": false}]
}

function resetAuthSlot() {
    return [{"event": "slot", "name": "auth_valid", "value": false}]
}


let generalHelper = {
    getQueriedValidTime, getDateWithDurationISOString, getCalendarId, aggregateCalendarIds, getTimeRangeFreeSlots,
    getDate, getTime, getTimeStamp, geterateQueryData, getNewsSlotsFromUtterance, checkUserOfficeLocation, resetAuthSlot
};
export {generalHelper}
