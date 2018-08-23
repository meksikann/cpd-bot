import actionIntents from "../constants/intents";
import {logInfo} from "../utils/logger";
import {getGoogleCalendarEvents} from './googleCalendarApiHandler';

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
            case actionIntents.action_show_events:
                logInfo('performing action_show_events ...');
                result.data = await showEvents();
                result.success = true;
                break;
            case actionIntents.action_help:
                logInfo('performing action_help ...');
                session.beginDialog(actionIntents.action_help);
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
    console.log('got all events HURA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', events);
    return events;
}

export {processActionIntent}
