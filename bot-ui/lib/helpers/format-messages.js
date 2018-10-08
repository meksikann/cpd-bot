'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateBotResponse = undefined;

var _messages = require('../constants/messages');

var _general = require('./general');

var fs = require('fs');

function getBotImage() {
    var image64 = new Buffer(fs.readFileSync('assets/img/lay-bot.jpeg').toString("base64"));
    return "data:image/jpeg;base64," + image64;
}

function generateBotResponse(data) {
    var response = {
        text: ''
    };

    var message = '';
    //return messages, which require to paste data in it.
    if (data.template == 'utter_show_free_slots') {
        message = 'Ok! so what we\'ve got here...\n        Free time available on ' + (0, _general.getDate)(data.slots.time) + ' :\n';

        var slots = data.slots.rooms_free_slots;

        slots.forEach(function (slot) {
            var roomMessage = '**' + slot.room_name + '**:\n';

            if (slot.free_slots && slot.free_slots.length) {
                slot.free_slots.forEach(function (freeSlot) {
                    roomMessage += '*from ' + (0, _general.getTime)(freeSlot.start) + ' to ' + (0, _general.getTime)(freeSlot.end) + '*. \n';
                });
            } else {
                roomMessage = _messages.messages.noFreeSpace;
            }

            message += roomMessage;
        });

        response.text = message;
        return response;
    } else if (data.template == 'utter_help') {
        message = _messages.messages.heroCard.subtitle + ',\n        ' + _messages.messages.getHelpMessage(process.env.BOT_MANUAL) + '\n        ';

        response.text = message;
        response.image = getBotImage();
        return response;
    }

    //return constant messages, which not require to paste data in it.
    response.text = _messages.messages.bot_response[data.template];
    return response;
}

exports.generateBotResponse = generateBotResponse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2Zvcm1hdC1tZXNzYWdlcy5qcyJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJnZXRCb3RJbWFnZSIsImltYWdlNjQiLCJCdWZmZXIiLCJyZWFkRmlsZVN5bmMiLCJ0b1N0cmluZyIsImdlbmVyYXRlQm90UmVzcG9uc2UiLCJkYXRhIiwicmVzcG9uc2UiLCJ0ZXh0IiwibWVzc2FnZSIsInRlbXBsYXRlIiwic2xvdHMiLCJ0aW1lIiwicm9vbXNfZnJlZV9zbG90cyIsImZvckVhY2giLCJzbG90Iiwicm9vbU1lc3NhZ2UiLCJyb29tX25hbWUiLCJmcmVlX3Nsb3RzIiwibGVuZ3RoIiwiZnJlZVNsb3QiLCJzdGFydCIsImVuZCIsIm1lc3NhZ2VzIiwibm9GcmVlU3BhY2UiLCJoZXJvQ2FyZCIsInN1YnRpdGxlIiwiZ2V0SGVscE1lc3NhZ2UiLCJwcm9jZXNzIiwiZW52IiwiQk9UX01BTlVBTCIsImltYWdlIiwiYm90X3Jlc3BvbnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUEsSUFBTUEsS0FBS0MsUUFBUSxJQUFSLENBQVg7O0FBRUEsU0FBU0MsV0FBVCxHQUF1QjtBQUNuQixRQUFJQyxVQUFVLElBQUlDLE1BQUosQ0FBV0osR0FBR0ssWUFBSCxDQUFnQix5QkFBaEIsRUFBMkNDLFFBQTNDLENBQW9ELFFBQXBELENBQVgsQ0FBZDtBQUNBLFdBQU8sNEJBQTRCSCxPQUFuQztBQUNIOztBQUVELFNBQVNJLG1CQUFULENBQTZCQyxJQUE3QixFQUFtQztBQUMvQixRQUFJQyxXQUFXO0FBQ1hDLGNBQU07QUFESyxLQUFmOztBQUlBLFFBQUlDLFVBQVUsRUFBZDtBQUNBO0FBQ0EsUUFBSUgsS0FBS0ksUUFBTCxJQUFpQix1QkFBckIsRUFBOEM7QUFDekNELHNGQUN3QixzQkFBUUgsS0FBS0ssS0FBTCxDQUFXQyxJQUFuQixDQUR4Qjs7QUFHRCxZQUFNRCxRQUFRTCxLQUFLSyxLQUFMLENBQVdFLGdCQUF6Qjs7QUFFQUYsY0FBTUcsT0FBTixDQUFjLFVBQUNDLElBQUQsRUFBVTtBQUNwQixnQkFBSUMscUJBQW1CRCxLQUFLRSxTQUF4QixVQUFKOztBQUVBLGdCQUFJRixLQUFLRyxVQUFMLElBQW1CSCxLQUFLRyxVQUFMLENBQWdCQyxNQUF2QyxFQUErQztBQUMzQ0oscUJBQUtHLFVBQUwsQ0FBZ0JKLE9BQWhCLENBQXdCLG9CQUFZO0FBQ2hDRSw4Q0FBd0Isc0JBQVFJLFNBQVNDLEtBQWpCLENBQXhCLFlBQXNELHNCQUFRRCxTQUFTRSxHQUFqQixDQUF0RDtBQUNILGlCQUZEO0FBSUgsYUFMRCxNQUtPO0FBQ0hOLDhCQUFjTyxtQkFBU0MsV0FBdkI7QUFDSDs7QUFFRGYsdUJBQVdPLFdBQVg7QUFDSCxTQWJEOztBQWVBVCxpQkFBU0MsSUFBVCxHQUFnQkMsT0FBaEI7QUFDQSxlQUFPRixRQUFQO0FBQ0gsS0F2QkQsTUF1Qk8sSUFBSUQsS0FBS0ksUUFBTCxJQUFpQixZQUFyQixFQUFtQztBQUN0Q0Qsa0JBQWFjLG1CQUFTRSxRQUFULENBQWtCQyxRQUEvQixtQkFDRUgsbUJBQVNJLGNBQVQsQ0FBd0JDLFFBQVFDLEdBQVIsQ0FBWUMsVUFBcEMsQ0FERjs7QUFJQXZCLGlCQUFTQyxJQUFULEdBQWdCQyxPQUFoQjtBQUNBRixpQkFBU3dCLEtBQVQsR0FBaUIvQixhQUFqQjtBQUNBLGVBQU9PLFFBQVA7QUFDSDs7QUFFRDtBQUNBQSxhQUFTQyxJQUFULEdBQWdCZSxtQkFBU1MsWUFBVCxDQUFzQjFCLEtBQUtJLFFBQTNCLENBQWhCO0FBQ0EsV0FBT0gsUUFBUDtBQUNIOztRQUdRRixtQixHQUFBQSxtQiIsImZpbGUiOiJmb3JtYXQtbWVzc2FnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge21lc3NhZ2VzfSBmcm9tIFwiLi4vY29uc3RhbnRzL21lc3NhZ2VzXCI7XG5pbXBvcnQge2dldERhdGUsIGdldFRpbWV9IGZyb20gJy4vZ2VuZXJhbCc7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuZnVuY3Rpb24gZ2V0Qm90SW1hZ2UoKSB7XG4gICAgdmFyIGltYWdlNjQgPSBuZXcgQnVmZmVyKGZzLnJlYWRGaWxlU3luYygnYXNzZXRzL2ltZy9sYXktYm90LmpwZWcnKS50b1N0cmluZyhcImJhc2U2NFwiKSk7XG4gICAgcmV0dXJuIFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIiArIGltYWdlNjRcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVCb3RSZXNwb25zZShkYXRhKSB7XG4gICAgbGV0IHJlc3BvbnNlID0ge1xuICAgICAgICB0ZXh0OiAnJ1xuICAgIH07XG5cbiAgICBsZXQgbWVzc2FnZSA9ICcnO1xuICAgIC8vcmV0dXJuIG1lc3NhZ2VzLCB3aGljaCByZXF1aXJlIHRvIHBhc3RlIGRhdGEgaW4gaXQuXG4gICAgaWYgKGRhdGEudGVtcGxhdGUgPT0gJ3V0dGVyX3Nob3dfZnJlZV9zbG90cycpIHtcbiAgICAgICAgIG1lc3NhZ2UgPSBgT2shIHNvIHdoYXQgd2UndmUgZ290IGhlcmUuLi5cbiAgICAgICAgRnJlZSB0aW1lIGF2YWlsYWJsZSBvbiAke2dldERhdGUoZGF0YS5zbG90cy50aW1lKX0gOlxcbmA7XG5cbiAgICAgICAgY29uc3Qgc2xvdHMgPSBkYXRhLnNsb3RzLnJvb21zX2ZyZWVfc2xvdHM7XG5cbiAgICAgICAgc2xvdHMuZm9yRWFjaCgoc2xvdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJvb21NZXNzYWdlID0gYCoqJHtzbG90LnJvb21fbmFtZX0qKjpcXG5gO1xuXG4gICAgICAgICAgICBpZiAoc2xvdC5mcmVlX3Nsb3RzICYmIHNsb3QuZnJlZV9zbG90cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzbG90LmZyZWVfc2xvdHMuZm9yRWFjaChmcmVlU2xvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJvb21NZXNzYWdlICs9IGAqZnJvbSAke2dldFRpbWUoZnJlZVNsb3Quc3RhcnQpfSB0byAke2dldFRpbWUoZnJlZVNsb3QuZW5kKX0qLiBcXG5gXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm9vbU1lc3NhZ2UgPSBtZXNzYWdlcy5ub0ZyZWVTcGFjZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWVzc2FnZSArPSByb29tTWVzc2FnZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzcG9uc2UudGV4dCA9IG1lc3NhZ2U7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGVsc2UgaWYgKGRhdGEudGVtcGxhdGUgPT0gJ3V0dGVyX2hlbHAnKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBgJHttZXNzYWdlcy5oZXJvQ2FyZC5zdWJ0aXRsZX0sXG4gICAgICAgICR7bWVzc2FnZXMuZ2V0SGVscE1lc3NhZ2UocHJvY2Vzcy5lbnYuQk9UX01BTlVBTCl9XG4gICAgICAgIGA7XG5cbiAgICAgICAgcmVzcG9uc2UudGV4dCA9IG1lc3NhZ2U7XG4gICAgICAgIHJlc3BvbnNlLmltYWdlID0gZ2V0Qm90SW1hZ2UoKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vcmV0dXJuIGNvbnN0YW50IG1lc3NhZ2VzLCB3aGljaCBub3QgcmVxdWlyZSB0byBwYXN0ZSBkYXRhIGluIGl0LlxuICAgIHJlc3BvbnNlLnRleHQgPSBtZXNzYWdlcy5ib3RfcmVzcG9uc2VbZGF0YS50ZW1wbGF0ZV07XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xufVxuXG5cbmV4cG9ydCB7IGdlbmVyYXRlQm90UmVzcG9uc2V9O1xuIl19