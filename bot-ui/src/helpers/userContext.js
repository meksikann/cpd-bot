import {logInfo, logError} from "../utils/logger";

const axios = require('axios');
import config from '../config/index';

async function getNextAction(userId, text) {
    try {
        const res = await axios.post(`${config.rasaParseUrl}${userId}/parse`,{
            "query":text
        });
        logInfo('received data from getNextAction', res.data);
        logInfo('received data from getNextAction intent is: ', res.data.tracker.latest_message.intent.name || 'No intent');
        return res.data;
    } catch(err) {
        logError(err);
        return;
    }
}

async function notifyBotBrainActionDone(data) {
    try {
        const res = await axios.post(`${config.rasaContinueUrl}${data.userId}/continue`, {
            "executed_action":data.executed_action,
            "events": data.events || []
        });

        logInfo('Notified executed action == ', data);
        return res.data;
    } catch(err) {
        logError(err);
        return;
    }
}

async function sendFallbackEvent(data, action) {
    const event = {
        "event": action
    };

    const res = await axios.post(`${config.rasaContinueUrl}${data.userId}/continue`, {
        "events": [event]
    });

    /* wanted to use this endpoint to set fallback event, but it doesnt work == bot gives prediction to
    listen always.
    */
    // const res = await axios.post(`${config.rasaContinueUrl}${data.userId}/tracker/events`, [event]);

    return res.data;
}

export {getNextAction, notifyBotBrainActionDone, sendFallbackEvent}
