import {messages} from './constants/messages';
import {createHeroCard} from './helpers/format-messages';
import actionIntents from './constants/intents';
import {getNextAction, notifyBotBrainActionDone} from './helpers/userContext';
import {logInfo} from './utils/logger';
import {processActionIntent} from './helpers/actionProcessor';

function botCreate(connector) {

    // init bot
    let bot = new builder.UniversalBot(connector, [
        function (session) {
            session.send(messages.bot_response.defaultmessage);
        }
    ]);

    bot.use({
        botbuilder: async (session, next) => {
            // use rasa-core server to predict next action *************
            const nextActionData = await getNextAction(session.message.user.id || 'default-user', session.message.text);

            if (nextActionData) {
                logInfo('manage dialog depending from data received from RASA-CORE');

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
    bot.dialog(actionIntents.action_help, [
        (session) => {
            const card = createHeroCard(session);
            // attach the card to the reply message
            const msg = new builder.Message(session).addAttachment(card);

            session.send(msg);
            session.endDialog();
        }
    ]);

    /**********************************************************************
     * ******************** end dialogs ***********************************
     * ********************************************************************/
}



/*
* method to make response deppending on data received from NLU processor.
* if next_action is simple utter_message that shoot it. else if next_action is in action actionIntents list - proceed intent,
 * else pass to default bot answer
* */
async function processNextAction(session, nextActionData, next) {
    let data = {
        userId: session.message.user.id || 'default-user'
    };
    logInfo(nextActionData);

    // set bot to listen to user - no other actions required
    if (nextActionData.next_action == actionIntents.action_listen) {
        return logInfo('LOG: action listen');
    }

    //if next_action is simple response (utter) message - shoot it!
    if (messages.bot_response[nextActionData.next_action]) {
        logInfo('Log: next_action found in bot utter responses');
        data.message = messages.bot_response[nextActionData.next_action];
        data.notifyBotBrainToContinue = true;
        data.executed_action = nextActionData.next_action;

        return sendBotReply(data, session, next);
    }

    // perform next bot action
    if (actionIntents[nextActionData.next_action]) {
        // do intent action process
        const nextActionPerform = nextActionData.next_action;
        const processResult = await processActionIntent(nextActionData, session);

        if (processResult.success) {
            data.executed_action = nextActionPerform;

            const nextActionData = await notifyBotBrainActionDone(data);
            return processNextAction(session, nextActionData, next);
        }

        logInfo('action performing not succeeded!!!!!')
        //TODO: handle action if success == false -----------------------
    }

    next();
}

//send response back to user
async function sendBotReply(data, session, next) {
    session.send(data.message);

    //notify BotBrain about utter action done and perform next action
    if (data.notifyBotBrainToContinue) {
        const nextActionData = await notifyBotBrainActionDone(data);
        return processNextAction(session, nextActionData, next);
    }
}

export {botCreate}
