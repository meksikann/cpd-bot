import {messages} from './constants/messages';
import {createHeroCard} from './helpers/format-messages';
import intents from './constants/intents';
import {getNextAction, notifyBotBrainActionDone, notifyBotBrainToRespond} from './helpers/userContext';

function botCreate(connector) {

    // init bot
    let bot = new builder.UniversalBot(connector, [
        function (session) {
            session.send(messages.bot_response.defaultmessage);
        }
    ]);

    // use rasa-core server *************
    bot.use({
        botbuilder: async (session, next) => {
            const nextActionData = await getNextAction(session.message.user.id || 'default-user', session.message.text);

            if (nextActionData) {
                console.log('manage dialog depending from data received from RASA-CORE');

                processNextAction(session, nextActionData, next);
            } else {
                next();
            }
        }
    });

    /**********************************************************************
     * ******************** dialogs ***************************************
     * ********************************************************************/

    /* shows help card*/
    bot.dialog(intents.help, [
        (session) => {
            const card = createHeroCard(session);
            // attach the card to the reply message
            const msg = new builder.Message(session).addAttachment(card);

            session.send(msg);
            session.endDialog();
        }
    ]).triggerAction({
            matches: /^help$/i
        }
    );
}

/*
* method to make response deppending on data received from NLU processor.
* if next_action is simple utter_message that shoot it. else if next_action is in action intents list - proceed intent,
 * else pass to default bot answer
* */
async function processNextAction(session, nextActionData, next) {
    let data = {};
    //if next_action is simple response message - shoot it!
    if (messages.bot_response[nextActionData.next_action]) {
        console.log('Log: next_action found in bot utter responses');
        data.message = messages.bot_response[nextActionData.next_action];
        data.notifyBotBrainToContinue = true;
        data.executed_action = nextActionData.next_action;

        sendBotReply(data, session);
    } else if (intents[nextActionData.next_action]) {
        // do intent action process
        const processResult = await processActionIntent(nextActionData);

        data.message = processResult.success ? processResult.message : 'TODO: need to work on it!'

        sendBotReply(data, session);
    } else {
        next();
    }
}

//process custom action
function processActionIntent(nextActionData) {
    if (messages.bot_response[nextActionData.next_action]) {
        // switch()
        //TODO: make IntentAction processor ----------------------------------------------------
    }

}

//send recponse back to user
function sendBotReply(data, session) {
    session.send(data.message);
    //TODO: send back responce to RASA ---------------------------------------------------------
    if (data.notifyBotBrainToContinue) {
        return notifyBotBrainActionDone(data);
    }
    if (data.notifyBotBrainToRespond) {
        return notifyBotBrainToRespond(data);
    }
}

export {botCreate}
