import {generateBotResponse} from './helpers/format-messages';
import {logError, logInfo} from './utils/logger';
import {processActionIntent} from './helpers/actionProcessor';
import {updateDbUserActions, getUserPermissions} from './helpers/database-queries';
import {generalConstants} from './constants/general';

async function botGenerateUtter(req, res) {
    logInfo(`Got generate Utter template for : ${req.body.template}.`);
    logInfo('Slots: ', req.body.tracker.slots);
    logInfo('Intent: ', req.body.tracker.latest_message.intent);
    logInfo(`userId: ${req.body.tracker.sender_id}`);
    logInfo('latest_message Text: ', req.body.tracker.latest_message.text);
    logInfo('Input channel: ', req.body.tracker.latest_input_channel);

    try {
        // get user data from db if user exists (use his name for some utterances)
        let user = await getUserPermissions(req.body.tracker.sender_id);
        let buttons = [];
        let inputChannel = req.body.tracker.latest_input_channel;

        let data = {
            senderId: req.body.tracker.sender_id || generalConstants.defaultUser,
            template: req.body.template,
            slots: req.body.tracker.slots,
            userName: user ? user.name: '',
            inputChannel
        };
        const utterance = generateBotResponse(data);

        // add buttons to template if input channel is defined
        if (req.body.template == 'utter_provide_office_location' && inputChannel) {
            buttons = [
                {'title': 'Vinnitsia', 'payload': generalConstants.officeLocations.vinnitsia},
                {'title': 'Lviv', 'payload': generalConstants.officeLocations.lviv}];
        }

        logInfo(utterance.text);
        res.send({
            "text": utterance.text,
            "buttons": buttons,
            "image": null,
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
    logInfo(`userId: ${req.body.sender_id}`);
    logInfo('Intent: ', req.body.tracker.latest_message.intent);
    logInfo('Slots: ', req.body.tracker.slots);
    logInfo('latest_message Text: ', req.body.tracker.latest_message.text);

    let dbData = {
        db: req.db,
        lastAction: req.body.next_action,
        userId: req.body.sender_id
    };
    const data = {
        senderId: req.body.sender_id || generalConstants.defaultUser,
        nextAction: req.body.next_action,
        slots: req.body.tracker.slots,
        entities: req.body.tracker.latest_message.entities,
        intent_name: req.body.tracker.latest_message.intent.name,
        channel: req.body.tracker.latest_input_channel,
        latest_message: req.body.tracker.latest_message.text
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
