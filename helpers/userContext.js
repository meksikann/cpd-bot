const axios = require('axios');
import config from '../config';

async function getNextAction(userId, text) {
    try {
        const res = await axios.post(config.rasaParseUrl,{"query":text});

        return res.data;
    } catch(err) {
        console.error(err);
        return;
    }
}

async function notifyBotBrainActionDone(data) {
    try {
        const res = await axios.post(config.rasaContinueUrl, {
            "executed_action":data.executed_action,
            "events": data.events || []
        });

        console.log('received data from notifyToContinue', res.data);
        return res.data;
    } catch(err) {
        console.error(err);
        return;
    }
}

export {getNextAction, notifyBotBrainActionDone}
