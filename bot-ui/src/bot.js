import {generateBotResponse} from './helpers/format-messages';
import {logError, logInfo} from './utils/logger';
import {processActionIntent} from './helpers/actionProcessor';
import {updateDbUserActions} from './helpers/database-queries';

const defaultUser = 'default-user';

function botGenerateUtter(req, res) {
    logInfo(`Got generate Utter request.Utter template: ${req.body.template}.`);
    let dbData = {
        db: req.db,
        lastAction: req.body.template,
        userId: req.body.tracker.sender_id
    };
    const data = {
        senderId: req.body.tracker.sender_id || defaultUser,
        template: req.body.template,
        slots: req.body.tracker.slots
    };

    try {
        const utterance = generateBotResponse(data);
        updateDbUserActions(dbData);

        res.send({
            "text": utterance.text,
            "buttons": [],
            "image": utterance.image,
            "elements": [],
            "attachments": []
        })
    } catch (err) {
        logError(err);
        res.send(err);
    }

}

async function botPerformAction(req, res) {
    logInfo(`Got perform Action request: ${req.body.next_action}`);
    let dbData = {
        db: req.db,
        lastAction: req.body.next_action,
        userId: req.body.sender_id
    };
    const data = {
        senderId: req.body.sender_id || defaultUser,
        nextAction: req.body.next_action,
        slots: req.body.tracker.slots
    };
    let response = {};

    try {
        response.events = await processActionIntent(data);
        response.responses = [];

        logInfo('Events sent ', response.events);

        updateDbUserActions(dbData);
        res.send(response);
    } catch (err) {
        logError(err);
        res.send(err);
    }
}



export {botGenerateUtter, botPerformAction}
