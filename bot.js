import {messages} from './constants/messages';
import {createHeroCard} from './helpers/format-messages';
import intents from './constants/intents';
import {getNextAction, notifyBotBrainActionDone} from './helpers/userContext';

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

    // set bot to listen to user - no other actions required
    if(nextActionData.next_action == intents.action_listen) {
        console.log('LOG: action listen');
        return;
    }

    //if next_action is simple response (utter) message - shoot it!
    if (messages.bot_response[nextActionData.next_action]) {
        console.log('Log: next_action found in bot utter responses');
        data.message = messages.bot_response[nextActionData.next_action];
        data.notifyBotBrainToContinue = true;
        data.executed_action = nextActionData.next_action;

        return sendBotReply(data, session, next);
    }

    // perform next bot action
    if (intents[nextActionData.next_action]) {
        // do intent action process
        const processResult = await processActionIntent(nextActionData);

        if(processResult.success) {
            data.executed_action = nextActionData.next_action;

            const nextActionData = await notifyBotBrainActionDone(data);
            return processNextAction(session, nextActionData, next);
        }

        //TODO: handle action if success == false -----------------------
    }

    next();
}

//TODO: make IntentAction processor ----------------------------------------------------
//process custom action
async function processActionIntent(nextActionData) {
    let result = {
        success: false;
    };

    switch(nextActionData.next_action) {
        case intents.action_create_event:
            console.log('performing action_create_event ...');
            break;
        case intents.action_update_event:
            console.log('performing action_update_event ...');
            break;
        case intents.action_remove_event:
            console.log('performing action_remove_event ...');
            break;
        default:
            console.log('performing default action ...');

            result.success = false;
    }

    return result;
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
