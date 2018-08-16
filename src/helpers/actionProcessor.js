import actionIntents from "../constants/intents";
import {logInfo} from "../utils/logger";


//TODO: make IntentAction processor ----------------------------------------------------
//process custom action
async function processActionIntent(nextActionData) {
    let result = {
        success: false
    };

    switch(nextActionData.next_action) {
        case actionIntents.action_create_event:
            logInfo('performing action_create_event ...');
            result.success = true;
            break;
        case actionIntents.action_update_event:
            logInfo('performing action_update_event ...');
            result.success = true;
            break;
        case actionIntents.action_remove_event:
            logInfo('performing action_remove_event ...');
            result.success = true;
            break;
        default:
            logInfo('performing default action ...');
            result.success = false;
    }

    return result;
}

export {processActionIntent}
