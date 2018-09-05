import actionIntents from "../constants/intents";
import {generalConstants} from '../constants/general';
import {logInfo} from "../utils/logger";
import {getGoogleCalendarEvents} from './googleCalendarApiHandler';
import  {formatEvents} from "../helpers/format-messages";
import {isPlainObject} from 'lodash';
import {getMilisecondsFromminutes, getDateISOString} from './general';
//process custom action
async function processActionIntent(nextActionData, session) {
    let result = {
        success: false
    };

    try {
        switch(nextActionData.next_action) {
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
                const queryData = {
                    roomName: nextActionData.tracker.slots.room_name,
                    time: nextActionData.tracker.slots.time
                };
                logInfo('performing action_check_room_available ...');
                result.events = await checkCpecifiedRoomAvailable(queryData);
                result.success = true;
                break;
            default:
                logInfo('performing default action ...');
                result.success = false;
        }
    } catch (e) {
        console.error(e);
    }

    return result;
}

async function showEvents() {
    let events = await getGoogleCalendarEvents();
    return events;
}


async function checkCpecifiedRoomAvailable(queryData) {
    const time = queryData.time;
    const minDurationAvailableMilisec = getMilisecondsFromminutes(generalConstants.minDurationAvailableMin);

    let result = [];
    let startTime;
    let endTime;
    let calendarId = queryData.roomName;
    let events;

    logInfo(`Checking if room available, room name: ${queryData.roomName}, and time: ${queryData.time}`);
    //RASA-core can return  Time slot as string or as Object(from:'', to: '') manage handle exact time or time range.

    if(time) {
        if(isPlainObject(time)) {
            console.log('stage 1');
            startTime = time.from || new Date().toISOString();
            endTime = time.to || getDateISOString(startTime, minDurationAvailableMilisec);
        } else {
            console.log('stage 2');
            startTime = time;
            endTime = getDateISOString(startTime, minDurationAvailableMilisec);
        }
    } else {
        console.log('stage 3');
        startTime = new Date().toISOString();
        endTime = getDateISOString(startTime, minDurationAvailableMilisec);
    }

    console.log('start time ------>', startTime);
    console.log('end time  ------>', endTime);

    //events = await getGoogleCalendarEvents(calendarId, startTime, endTime);

    // if there are event on requested time - send room is busy, else - send room is free
    if(events && events.length) {
        result = [{"event": "slot", "name": "is_room_available", "value": "False"}];
    } else {
        result = [{"event": "slot", "name": "is_room_available", "value": "True"}];
    }

    return result;
}


export {processActionIntent}
