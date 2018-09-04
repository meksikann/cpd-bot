import actionIntents from "../constants/intents";
import {logInfo} from "../utils/logger";
import {getGoogleCalendarEvents} from './googleCalendarApiHandler';
import  {formatEvents} from "../helpers/format-messages";

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
                result.events = await checkRoomAvailable(queryData);
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

async function checkRoomAvailable(queryData) {
    //TODO: make check room available API----------------->
    logInfo('Checking if room available...', queryData);

    return [{"event": "slot", "name": "is_room_available", "value": "True"}];
}

export {processActionIntent}
