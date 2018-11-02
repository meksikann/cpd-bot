import {messages} from "../constants/messages";
import {generalHelper} from './general';
import config from  '../config';

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
    //return messages, which require to paste data in it.
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
                roomMessage = messages.noFreeSpace;
            }

            message += roomMessage;
        });

        response.text = message;
        return response;
    } else if (data.template == 'utter_help') {
        message = `${messages.heroCard.subtitle}.
        ${messages.getHelpMessage(process.env.BOT_MANUAL)}
        `;

        response.text = message;
        response.image = getBotImage();
        return response;
    } else if (data.template == 'utter_confirm_booking') {
        console.log(data);
        let req = {
            time: data.slots.time,
            formatted_duration: data.slots.formatted_duration,
            roomName: data.slots.room_name
        };
        response.text = messages.getConfirmBookingMessage(req);
        return response;
    }

    //return constant messages, which not require to paste data in it.
    response.text = messages.bot_response[data.template];
    return response;
}


export { generateBotResponse};
