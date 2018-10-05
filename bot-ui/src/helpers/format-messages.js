import {messages} from "../constants/messages";
import {getDate, getTime} from './general';
const builder = require('botbuilder');

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

function getBotImage() {
    var image64 = new Buffer(fs.readFileSync('assets/img/lay-bot.jpeg').toString("base64"));
    return "data:image/jpeg;base64," + image64
}

function formatEvents(events) {
    let formattedEvents = '';

    if (events && events.length) {
        events.forEach((event, i) => {
            const start = event.start.dateTime || event.start.date;
            formattedEvents += `${start} - ${event.summary} <br/>`;
        });
    } else {
        formattedEvents = messages.calendarIsEmpty;
    }

    return formattedEvents;
}

function generateBotResponse(data) {
    let response = {
        text: ''
    };

    let message = '';
    //return messages, which require to paste data in it.
    if (data.template == 'utter_show_free_slots') {
         message = `Ok! so what we've got here...
        Free time available on ${getDate(data.slots.time)} :\n`;

        const slots = data.slots.rooms_free_slots;

        slots.forEach((slot) => {
            let roomMessage = `**${slot.room_name}**:\n`;

            if (slot.free_slots && slot.free_slots.length) {
                slot.free_slots.forEach(freeSlot => {
                    roomMessage += `*from ${getTime(freeSlot.start)} to ${getTime(freeSlot.end)}*. \n`
                });

            } else {
                roomMessage = messages.noFreeSpace;
            }

            message += roomMessage;
        });

        response.text = message;
        return response;
    } else if (data.template == 'utter_help') {
        message = `${messages.heroCard.subtitle},
        ${messages.getHelpMessage(process.env.BOT_MANUAL)}
        `;

        response.text = message;
        response.image = getBotImage();
        return response;
    }

    //return constant messages, which not require to paste data in it.
    response.text = messages.bot_response[data.template];
    return response;
}


export {createHeroCard, formatEvents, generateBotResponse};
