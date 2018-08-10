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

async function setActionDone(data) {
    try {
        const res = await axios.post(config.rasaContinueUrl,{"body":data});

        return res.data;
    } catch(err) {
        console.error(err);
        return;
    }
}



export {getNextAction, setActionDone}
