import {messages} from './constants/messages';
import {createHeroCard} from './helpers/format-messages';
import intents from './constants/intents';
import {getNextAction} from './helpers/userContext';

function botCreate(connector) {

    // init bot
    let bot = new builder.UniversalBot(connector, [
        function (session) {
            session.send(messages.defaultmessage);
        }
    ]);

    // use rasa-core server *************
    bot.use({
        botbuilder: async (session, next) => {
            //TODO: use RASA_CORE here -------------------------------------
            const nextActionData = await getNextAction(session.message.user.id || 'default-user',session.message.text);

            if(nextActionData) {
                console.log('manage dialog deppending from data received from RASA-CORE');
                console.log(nextActionData.next_action);


                // session.beginDialog(intents.utter_greet);

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

    /* greeting message*/
    bot.dialog(intents.utter_greet, [
        (session) => {
            session.endDialog(messages.greetingFirstTime);
        }
    ]);
}



export {botCreate}
