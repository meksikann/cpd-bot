import actionIntents from "../constants/intents";
import {generalConstants} from '../constants/general';
import {logInfo, logError} from "../utils/logger";
import {getGoogleCalendarEvents} from './googleCalendarApiHandler';
import {formatEvents} from "../helpers/format-messages";
import {isPlainObject} from 'lodash';
import {getDateISOString, getCalendarId} from './general';


//process custom action
async function processActionIntent(nextActionData, session) {
    let result = {
        success: false
    };

    let queryData;

    try {
        switch (nextActionData.next_action) {
            case actionIntents.action_create_event:
                //TODO: make IntentAction processor ----------------------------------------------------
                logInfo('performing action_create_event ...');
                result.success = true;
                break;
            case actionIntents.action_update_event:
                //TODO: make IntentAction processor ----------------------------------------------------
                logInfo('performing action_update_event ...');
                result.success = true;
                break;
            case actionIntents.action_remove_event:
                //TODO: make IntentAction processor ----------------------------------------------------
                logInfo('performing action_remove_event ...');
                result.success = true;
                break;
            case actionIntents.action_show_my_events:
                logInfo('performing action_show_events ...');
                result.data = await showEvents();
                result.success = true;

                session.send(formatEvents(result.data));
                break;
            case actionIntents.action_help:
                logInfo('performing action_help ...');
                session.beginDialog(actionIntents.action_help);
                break;
            case actionIntents.action_check_room_available:
                queryData = {
                    roomName: nextActionData.tracker.slots.room_name,
                    time: nextActionData.tracker.slots.time
                };
                logInfo('performing action_check_room_available ...');
                result.events = await checkCpecifiedRoomAvailable(queryData);
                result.success = true;
                break;
            case actionIntents.action_check_room_exists:
                queryData = {
                    roomName: nextActionData.tracker.slots.room_name,
                    time: nextActionData.tracker.slots.time
                };
                logInfo('performing action_check_room_exists ...');
                result.events = checkCpecifiedRoomExists(queryData);
                result.success = true;
                break;
            case actionIntents.action_get_room_free_slots:
                logInfo('performing action_get_room_free_slots ...');
                result.success = true;
                break;

            default:
                logInfo('performing default action ...');
                result.success = false;
        }
    } catch (e) {
        logError(e);
    }

    return result;
}

async function showEvents() {
    let events = await getGoogleCalendarEvents();
    return events;
}

function checkCpecifiedRoomExists(queryData) {
    let result = [];
    let exists = getCalendarId(queryData.roomName);

    if (exists) {
        result = [
            {"event": "slot", "name": "is_room_exists", "value": true},
        ];
    } else {
        result = [
            {"event": "slot", "name": "is_room_exists", "value": false},
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
    logInfo('Chosen calendar ID: ', calendarId);

    logInfo(`Checking if room available, room name: ${queryData.roomName}, and time: ${queryData.time}`);
    //RASA-core can return  Time slot as string or as Object(from:'', to: '') manage handle exact time or time range.

    if (time) {
        if (isPlainObject(time)) {
            startTime = time.from || new Date().toISOString();
            endTime = time.to || getDateISOString(startTime, generalConstants.minDurationAvailableMin);
        } else {
            startTime = time;
            endTime = getDateISOString(startTime, generalConstants.minDurationAvailableMin);
        }
    } else {
        startTime = new Date().toISOString();
        endTime = getDateISOString(startTime, generalConstants.minDurationAvailableMin);
    }

    events = await getGoogleCalendarEvents(calendarId, startTime, endTime);

    console.log(events);
    // if there are event on requested time - send room is busy, else - send room is free
    if (events && events.length) {
        result = [
            {"event": "slot", "name": "is_room_available", "value": false},
            {"event": "slot", "name": "time", "value": startTime},
        ];
    } else {
        result = [
            {"event": "slot", "name": "is_room_available", "value": true},
            {"event": "slot", "name": "time", "value": startTime},
        ];
    }

    return result;
}



export {processActionIntent}
