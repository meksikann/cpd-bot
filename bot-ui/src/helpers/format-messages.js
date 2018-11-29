import {getBotUtterance} from "../constants/messages";
import {generalHelper} from './general';
import config from '../config';

const fs = require('fs');

function getBotImage() {
    var image64 = new Buffer(fs.readFileSync('assets/img/lay-bot.jpeg').toString("base64"));
    return "data:image/jpeg;base64," + image64
}

function generateBotResponse(data) {
    let response = {
        text: ''
    };
    let message = '';
    let opts = {
        time: generalHelper.getHumanizedTime(data.slots.time || generalHelper.getQueriedValidTime()),
        formatted_duration: data.slots.formatted_duration || generalHelper.getFormattedDuration(config.minDurationAvailableMin * 60),
        roomName: data.slots.room_name,
        userName: data.userName || '',
        template: data.template,
        url: process.env.BOT_MANUAL
    };

    //  generate custom bot utterance  ----------------------------
    if (data.template == 'utter_show_free_slots') {
        message = `Ok! so what we've got here...
        Free time available on ${generalHelper.getDate(data.slots.time)} :\n`;

        const slots = data.slots.rooms_free_slots;

        slots.forEach((slot) => {
            let roomMessage = `**${slot.room_name}**:\n`;

            if (slot.free_slots && slot.free_slots.length) {
                slot.free_slots.forEach(freeSlot => {
                    roomMessage += `*from ${generalHelper.getTime(freeSlot.start)} to ${generalHelper.getTime(freeSlot.end)}*. \n`
                });

            } else {
                roomMessage = getBotUtterance(opts);
            }

            message += roomMessage;
        });

        // remove extra text formatting when no chat channel defined
        if(!data.inputChannel) {
            message = generalHelper.removeExtraTextMarkup(message);
        }
        response.text = message;
        return response;
    }

    message = getBotUtterance(opts);
    // remove extra text formatting when no chat channel defined
    if(!data.inputChannel) {
        message = generalHelper.removeExtraTextMarkup(message);
    }
    // get bot responses with variables
    response.text = message;
    return response;
}


export {generateBotResponse};
