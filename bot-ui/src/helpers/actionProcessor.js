import actionIntents from "../constants/intents";
import {logInfo, logError} from "../utils/logger";
import {getGoogleCalendarEvents} from './googleCalendarApiHandler';
import {isPlainObject} from 'lodash';
import config from '../config';
import {getDateWithDurationISOString, getCalendarId, aggregateCalendarIds, getTimeRangeFreeSlots, getQueriedValidTime} from './general';


//process custom action
async function processActionIntent(nextActionData) {
    let events = [];

    let queryData;

    try {
        switch (nextActionData.nextAction) {
            case actionIntents.action_create_event:
                //TODO: make IntentAction processor ----------------------------------------------------
                logInfo('performing action_create_event ...');
                break;
            case actionIntents.action_update_event:
                //TODO: make IntentAction processor ----------------------------------------------------
                logInfo('performing action_update_event ...');
                break;
            case actionIntents.action_remove_event:
                //TODO: make IntentAction processor ----------------------------------------------------
                logInfo('performing action_remove_event ...');
                break;
            case actionIntents.action_show_my_events:
                logInfo('performing action_show_events ...');
                //TODO: make IntentAction processor ----------------------------------------------------
                break;
            case actionIntents.action_help:
                logInfo('performing action_help ...');
                //TODO: make IntentAction processor ----------------------------------------------------
                break;
            case actionIntents.action_check_room_available:
                queryData = {
                    roomName: nextActionData.slots.room_name,
                    time: getQueriedValidTime(nextActionData.slots.time)
                };
                logInfo('performing action_check_room_available ...');
                events = await checkCpecifiedRoomAvailable(queryData);
                break;
            case actionIntents.action_check_room_exists:
                queryData = {
                    roomName: nextActionData.slots.room_name,
                    time: getQueriedValidTime(nextActionData.slots.time)
                };
                logInfo('performing action_check_room_exists ...');
                events = checkCpecifiedRoomExists(queryData);
                break;
            case actionIntents.action_get_room_free_slots:
                logInfo('performing action_get_room_free_slots ...');
                queryData = {
                    roomName: nextActionData.slots.room_name,
                    time: getQueriedValidTime(nextActionData.slots.time)
                };
                events = await generateFreeSlots(queryData);
                break;

            default:
                logInfo('performing default action ...');
        }

        return events;
    } catch (e) {
        throw e;
    }
}

// async function showEvents() {
//     let events = await getGoogleCalendarEvents();
//     return events;
// }

function checkCpecifiedRoomExists(queryData) {
    let result = [];
    let exists = getCalendarId(queryData.roomName);

    if (exists) {
        result = [
            {"event": "slot", "name": "is_room_exists", "value": true, "timestamp": Date.now()},
        ];
    } else {
        result = [
            {"event": "slot", "name": "is_room_exists", "value": false, "timestamp": Date.now()},
        ];
    }

    return result;
}

async function checkCpecifiedRoomAvailable(queryData) {
    const time = queryData.time;
    let result = [];
    let startTime;
    let endTime;
    let calendarId = getCalendarId(queryData.roomName);
    let events;

    logInfo(`Checking if room available, room name: ${queryData.roomName}, and time: ${queryData.time}`);
    //RASA-core can return  Time slot as string or as Object(from:'', to: '') manage handle exact time or time range.

    if (time) {
        if (isPlainObject(time)) {
            startTime = time.from || new Date().toISOString();
            endTime = time.to || getDateWithDurationISOString(startTime, config.minDurationAvailableMin, 'minutes', true);
        } else {
            startTime = time;
            endTime = getDateWithDurationISOString(startTime, config.minDurationAvailableMin, 'minutes', true);
        }
    } else {
        startTime = new Date().toISOString();
        endTime = getDateWithDurationISOString(startTime, config.minDurationAvailableMin, 'minutes', true);
    }

    events = await getGoogleCalendarEvents(calendarId, startTime, endTime);

    // if there are event on requested time - send room is busy, else - send room is free
    if (events && events.length) {
        result = [
            {"event": "slot", "name": "is_room_available", "value": false, "timestamp": Date.now()},
            {"event": "slot", "name": "time", "value": startTime, "timestamp": Date.now()},
        ];
    } else {
        result = [
            {"event": "slot", "name": "is_room_available", "value": true, "timestamp": Date.now()},
            {"event": "slot", "name": "time", "value": startTime, "timestamp": Date.now()},
        ];
    }

    return result;
}

async function generateFreeSlots(queryData) {
    logInfo('generate free slots. Room names: ', queryData.roomName);
    const roomName = queryData.roomName;
    const shouldAdd = true;
    const minutesRange = config.freeSpaceSearchTimeRangeMins;
    let result;
    let freeSlots = [];

    const calendarsIds = aggregateCalendarIds(roomName);
    const startTime = getQueriedValidTime(getDateWithDurationISOString(queryData.time || new Date().toISOString(), minutesRange, 'minutes',
        !shouldAdd));
    const endTime = getQueriedValidTime(getDateWithDurationISOString(queryData.time || new Date().toISOString(), minutesRange, 'minutes',
        shouldAdd));

    //get events in selected time range for array of calendars
    const pArray = calendarsIds.map(async calObj => {
        let freeSlotObject = {};
        const events = await getGoogleCalendarEvents(calObj.id, startTime, endTime);

        freeSlotObject.room_name = calObj.name;
        freeSlotObject.room_id = calObj.id;
        freeSlotObject.free_slots = [];

        //if there are busy slots in  calendar time range - calculate free slots
        if (events && events.length) {
            freeSlotObject.free_slots = getTimeRangeFreeSlots(startTime, endTime, events);
        } else {
            //if not busy slots in calendar time range - set fee slot from startTima to endTime
            freeSlotObject.free_slots.push({
                start: startTime,
                end: endTime
            })
        }

        return freeSlotObject;
    });

    freeSlots = await Promise.all(pArray);
    result = [
        {"event": "slot", "name": "rooms_free_slots", "value": freeSlots, "timestamp": Date.now()}
    ];

    return result;
}


export {processActionIntent}
