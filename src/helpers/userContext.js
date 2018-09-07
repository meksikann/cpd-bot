import {logInfo} from "../utils/logger";

const axios = require('axios');
import config from '../config/index';

async function getNextAction(userId, text) {
    try {
        const res = await axios.post(`${config.rasaParseUrl}${userId}/parse`,{
            "query":text
        });
        logInfo('received data from getNextAction', res.data);
        return res.data;
    } catch(err) {
        console.error(err);
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
        console.error(err);
        return;
    }
}

export {getNextAction, notifyBotBrainActionDone}
