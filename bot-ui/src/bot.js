import {generateBotResponse} from './helpers/format-messages';
import {logError, logInfo} from './utils/logger';
import {processActionIntent} from './helpers/actionProcessor';



const defaultUser = 'default-user';

function botGenerateUtter(req, res) {
    logInfo(`Got generate Utter request.Utter template: ${req.body.template}.`);

    updateDbUserActions(req.db);

    const data = {
        senderId: req.body.tracker.sender_id || defaultUser,
        template: req.body.template,
        slots: req.body.tracker.slots
    };

    try {
        const utterance = generateBotResponse(data);

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
    const data = {
        senderId: req.body.sender_id || defaultUser,
        nextAction: req.body.next_action,
        slots: req.body.tracker.slots
    };
    let response = {};

    try {
        response.events = await processActionIntent(data);
        response.responses = [];

        logInfo('Events sent ',response.events);

        res.send(response);
    } catch (err) {
        logError(err);
        res.send(err);
    }
}

function updateDbUserActions(db) {

    // Get our form values. These rely on the "name" attributes
    var userName = 'serhiy';
    var userEmail = 'test';

    // Set our collection
    var collection = db.get('users');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            console.error(err)
        }
        else {
            console.log('saved====================>');

        }
    });
}

export {botGenerateUtter, botPerformAction}
