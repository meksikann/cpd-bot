import {messages} from "../constants/messages";
const fs = require('fs');

function createHeroCard(session) {
    var image64 = new Buffer(fs.readFileSync('assets/img/lay-bot.jpeg').toString("base64"));

    return new builder.HeroCard(session)
        .title(messages.heroCard.title)
        .subtitle(messages.heroCard.subtitle)
        .text(messages.heroCard.text)
        .images([
            builder.CardImage.create(session, "data:image/jpeg;base64," + image64)
        ])
        .buttons([
            builder.CardAction.openUrl(session, process.env.BOT_MANUAL || '', messages.heroCard.buttonLabel)
        ]);
}

export {createHeroCard};
