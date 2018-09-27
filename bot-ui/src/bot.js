import {generateBotResponse} from './helpers/format-messages';
import {logError, logInfo} from './utils/logger';
import {processActionIntent} from './helpers/actionProcessor';

const defaultUser = 'default-user';

//     /* shows help card*/
//     bot.dialog(actionIntents.action_help, [
//         (session) => {
//             const card = createHeroCard(session);
//             // attach the card to the reply message
//             const msg = new builder.Message(session).addAttachment(card);
//
//             session.send(msg);
//             session.endDialog();
//         }
//     ]);
function botGenerateUtter(req, res) {
    logInfo(`Got generate Utter request.Utter template: ${req.body.template}.`);

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

export {botGenerateUtter, botPerformAction}
