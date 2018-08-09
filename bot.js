import {messages} from './constants/messages';
import intents from './constants/intents';

global.builder = require('botbuilder');
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

function botCreate(connector) {

    // init bot
    let bot = new builder.UniversalBot(connector, [
        function (session) {
            session.send(messages.defaultmessage);
        }
    ])

    /**********************************************************************
     * ******************** dialogs ***************************************
     * ********************************************************************/

    bot.dialog(intents.Greeting, [
        (session) => {
            // session.send(messages.greetingFirstTime);
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

function createHeroCard(session) {
    var image64 = new Buffer(fs.readFileSync('assets/img/lay-bot.jpeg').toString("base64"));

    return new builder.HeroCard(session)
        .title(messages.heroCard.title)
        .subtitle(messages.heroCard.subtitle)
        .text(messages.heroCard.text)
        .images([
            builder.CardImage.create(session, "data:image/jpeg;base64,"+image64)
        ])
        .buttons([
            builder.CardAction.openUrl(session, process.env.BOT_MANUAL || '', messages.heroCard.buttonLabel)
        ]);
}

export {botCreate}
