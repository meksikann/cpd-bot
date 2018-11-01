import actionIntents from "../constants/intents";
import {logInfo, logError} from "../utils/logger";
import {getGoogleCalendarEvents} from './googleCalendarApiHandler';
import {isPlainObject} from 'lodash';
import config from '../config';

import {generalHelper} from './general';

const seconds = 'seconds';

//process custom action
async function processActionIntent(nextActionData) {
    let events = [];

    let queryData;

    logInfo('processActionIntent')
    console.log(nextActionData);

    try {
        switch (nextActionData.nextAction) {
            case actionIntents.action_check_room_available:
                logInfo('performing action_check_room_available ...');

                queryData = generalHelper.geterateQueryData(nextActionData);
                events = await checkCpecifiedRoomAvailable(queryData);
                break;
            case actionIntents.action_check_room_exists:
                logInfo('performing action_check_room_exists ...');

                queryData = generalHelper.geterateQueryData(nextActionData);
                events = checkCpecifiedRoomExists(queryData);
                break;
            case actionIntents.action_get_room_free_slots:
                logInfo('performing action_get_room_free_slots ...');

                queryData = {
                    roomName: nextActionData.slots.room_name,
                    time: generalHelper.getQueriedValidTime(nextActionData.slots.time)
                };
                events = await generateFreeSlots(queryData);
                break;
            case actionIntents.action_get_new_slots:

                logInfo('performing action_get_new_slots1 ...');

                events = generalHelper.getNewsSlotsFromUtterance(nextActionData);
                break;
            case actionIntents.action_check_auth_valid:
                logInfo('performing action_check_auth_valid ...');

                events = await generalHelper.checkUserAuth(nextActionData);
                break;

            case actionIntents.action_reset_auth_valid_slot:
                logInfo('performing action_reset_auth_valid_slot ...');

                events = generalHelper.resetAuthSlot();
                break;
            case actionIntents.action_check_office_location:
                logInfo('performing action_check_office_location ...');
                events = generalHelper.getUserOfficeLocation(nextActionData);
                break;
            case actionIntents.action_save_office_location:
                logInfo('performing action_save_office_location ...');
                await generalHelper.saveUserOfficeLocation(nextActionData);

                break;
            case actionIntents.action_save_user_email:
                logInfo('performing action_save_user_email ...');
                events = await generalHelper.saveUserEmail(nextActionData);

                break;
            case actionIntents.action_save_user_name:
                logInfo('performing action_save_user_name ....');
                events = generalHelper.saveUserName(nextActionData);

                break;
            default:
                logInfo('performing default action ...');
        }

        return events;
    } catch (e) {
        logError(e);
        throw e;
    }
}

function checkCpecifiedRoomExists(queryData) {
    let result = [];
    let exists = generalHelper.getCalendarId(queryData.roomName);

    let durationValue = queryData.duration ? queryData.duration.value : null;

    // if mentioned new duration inutterance
    if (durationValue && durationValue != queryData.normalized_duration) {
        result.push(
            {"event": "slot", "name": "normalized_duration", "value": durationValue, "timestamp": Date.now()},
        )
    }

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
    let calendarId = generalHelper.getCalendarId(queryData.roomName);
    let events;
    let durationValue = queryData.duration ? queryData.duration.value : null;
    let durationUnit = queryData.duration ? queryData.duration.unit : null;

    // if mentioned new duration inutterance
    if (durationValue && durationValue != queryData.normalized_duration) {
        result.push(
            {"event": "slot", "name": "normalized_duration", "value": durationValue, "timestamp": Date.now()},
        )
    } else
    // if normalized_duration exists in slots from utterances mentioned before
    if (!durationValue && queryData.normalized_duration) {
        durationValue = queryData.normalized_duration;
        durationUnit = seconds;
    }


    console.log('got duration ----------->', durationValue, durationUnit);
    logInfo(`Checking if room available, room name: ${queryData.roomName}, and time: ${queryData.time}`);
    //RASA-core can return  Time slot as string or as Object(from:'', to: '') manage handle exact time or time range.

    if (time) {
        if (isPlainObject(time)) {
            startTime = time.from || new Date().toISOString();
            endTime = time.to || generalHelper.getDateWithDurationISOString(startTime, durationValue || config.minDurationAvailableMin,
                durationUnit || 'minutes', true);
        } else {
            startTime = time;
            endTime = generalHelper.getDateWithDurationISOString(startTime, durationValue || config.minDurationAvailableMin,
                durationUnit || 'minutes', true);
        }
    } else {
        startTime = new Date().toISOString();
        endTime = generalHelper.getDateWithDurationISOString(startTime, durationValue || config.minDurationAvailableMin,
            durationUnit || 'minutes', true);
    }

    events = await getGoogleCalendarEvents(calendarId, startTime, endTime);

    // if there are event on requested time - send room is busy, else - send room is free
    if (events && events.length) {
        result = [
            {"event": "slot", "name": "is_room_available", "value": false, "timestamp": Date.now()}
        ];
    } else {
        result = [
            {"event": "slot", "name": "is_room_available", "value": true, "timestamp": Date.now()}
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

    const calendarsIds = generalHelper.aggregateCalendarIds(roomName);
    const startTime = generalHelper.getQueriedValidTime(generalHelper.getDateWithDurationISOString(queryData.time ||
        new Date().toISOString(), minutesRange, 'minutes',
        !shouldAdd));
    const endTime = generalHelper.getQueriedValidTime(generalHelper.getDateWithDurationISOString(queryData.time ||
        new Date().toISOString(), minutesRange, 'minutes',
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
            freeSlotObject.free_slots = generalHelper.getTimeRangeFreeSlots(startTime, endTime, events);
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
