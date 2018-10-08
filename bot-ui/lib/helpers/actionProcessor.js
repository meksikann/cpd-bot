"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.processActionIntent = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

//process custom action
var processActionIntent = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(nextActionData) {
        var events, queryData;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        events = [];
                        queryData = void 0;
                        _context.prev = 2;
                        _context.t0 = nextActionData.nextAction;
                        _context.next = _context.t0 === _intents2.default.action_create_event ? 6 : _context.t0 === _intents2.default.action_update_event ? 8 : _context.t0 === _intents2.default.action_remove_event ? 10 : _context.t0 === _intents2.default.action_show_my_events ? 12 : _context.t0 === _intents2.default.action_help ? 14 : _context.t0 === _intents2.default.action_check_room_available ? 16 : _context.t0 === _intents2.default.action_check_room_exists ? 22 : _context.t0 === _intents2.default.action_get_room_free_slots ? 26 : 32;
                        break;

                    case 6:
                        //TODO: make IntentAction processor ----------------------------------------------------
                        (0, _logger.logInfo)('performing action_create_event ...');
                        return _context.abrupt("break", 33);

                    case 8:
                        //TODO: make IntentAction processor ----------------------------------------------------
                        (0, _logger.logInfo)('performing action_update_event ...');
                        return _context.abrupt("break", 33);

                    case 10:
                        //TODO: make IntentAction processor ----------------------------------------------------
                        (0, _logger.logInfo)('performing action_remove_event ...');
                        return _context.abrupt("break", 33);

                    case 12:
                        (0, _logger.logInfo)('performing action_show_events ...');
                        //TODO: make IntentAction processor ----------------------------------------------------
                        return _context.abrupt("break", 33);

                    case 14:
                        (0, _logger.logInfo)('performing action_help ...');
                        //TODO: make IntentAction processor ----------------------------------------------------
                        return _context.abrupt("break", 33);

                    case 16:
                        queryData = {
                            roomName: nextActionData.slots.room_name,
                            time: (0, _general.getQueriedValidTime)(nextActionData.slots.time)
                        };
                        (0, _logger.logInfo)('performing action_check_room_available ...');
                        _context.next = 20;
                        return checkCpecifiedRoomAvailable(queryData);

                    case 20:
                        events = _context.sent;
                        return _context.abrupt("break", 33);

                    case 22:
                        queryData = {
                            roomName: nextActionData.slots.room_name,
                            time: (0, _general.getQueriedValidTime)(nextActionData.slots.time)
                        };
                        (0, _logger.logInfo)('performing action_check_room_exists ...');
                        events = checkCpecifiedRoomExists(queryData);
                        return _context.abrupt("break", 33);

                    case 26:
                        (0, _logger.logInfo)('performing action_get_room_free_slots ...');
                        queryData = {
                            roomName: nextActionData.slots.room_name,
                            time: (0, _general.getQueriedValidTime)(nextActionData.slots.time)
                        };
                        _context.next = 30;
                        return generateFreeSlots(queryData);

                    case 30:
                        events = _context.sent;
                        return _context.abrupt("break", 33);

                    case 32:
                        (0, _logger.logInfo)('performing default action ...');

                    case 33:
                        return _context.abrupt("return", events);

                    case 36:
                        _context.prev = 36;
                        _context.t1 = _context["catch"](2);
                        throw _context.t1;

                    case 39:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[2, 36]]);
    }));

    return function processActionIntent(_x) {
        return _ref.apply(this, arguments);
    };
}();

// async function showEvents() {
//     let events = await getGoogleCalendarEvents();
//     return events;
// }

var checkCpecifiedRoomAvailable = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryData) {
        var time, result, startTime, endTime, calendarId, events;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        time = queryData.time;
                        result = [];
                        startTime = void 0;
                        endTime = void 0;
                        calendarId = (0, _general.getCalendarId)(queryData.roomName);
                        events = void 0;


                        (0, _logger.logInfo)("Checking if room available, room name: " + queryData.roomName + ", and time: " + queryData.time);
                        //RASA-core can return  Time slot as string or as Object(from:'', to: '') manage handle exact time or time range.

                        if (time) {
                            if ((0, _lodash.isPlainObject)(time)) {
                                startTime = time.from || new Date().toISOString();
                                endTime = time.to || (0, _general.getDateWithDurationISOString)(startTime, _config2.default.minDurationAvailableMin, 'minutes', true);
                            } else {
                                startTime = time;
                                endTime = (0, _general.getDateWithDurationISOString)(startTime, _config2.default.minDurationAvailableMin, 'minutes', true);
                            }
                        } else {
                            startTime = new Date().toISOString();
                            endTime = (0, _general.getDateWithDurationISOString)(startTime, _config2.default.minDurationAvailableMin, 'minutes', true);
                        }

                        _context2.next = 10;
                        return (0, _googleCalendarApiHandler.getGoogleCalendarEvents)(calendarId, startTime, endTime);

                    case 10:
                        events = _context2.sent;


                        // if there are event on requested time - send room is busy, else - send room is free
                        if (events && events.length) {
                            result = [{ "event": "slot", "name": "is_room_available", "value": false, "timestamp": Date.now() }, { "event": "slot", "name": "time", "value": startTime, "timestamp": Date.now() }];
                        } else {
                            result = [{ "event": "slot", "name": "is_room_available", "value": true, "timestamp": Date.now() }, { "event": "slot", "name": "time", "value": startTime, "timestamp": Date.now() }];
                        }

                        return _context2.abrupt("return", result);

                    case 13:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function checkCpecifiedRoomAvailable(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var generateFreeSlots = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(queryData) {
        var _this = this;

        var roomName, shouldAdd, minutesRange, result, freeSlots, calendarsIds, startTime, endTime, pArray;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        (0, _logger.logInfo)('generate free slots. Room names: ', queryData.roomName);
                        roomName = queryData.roomName;
                        shouldAdd = true;
                        minutesRange = _config2.default.freeSpaceSearchTimeRangeMins;
                        result = void 0;
                        freeSlots = [];
                        calendarsIds = (0, _general.aggregateCalendarIds)(roomName);
                        startTime = (0, _general.getQueriedValidTime)((0, _general.getDateWithDurationISOString)(queryData.time || new Date().toISOString(), minutesRange, 'minutes', !shouldAdd));
                        endTime = (0, _general.getQueriedValidTime)((0, _general.getDateWithDurationISOString)(queryData.time || new Date().toISOString(), minutesRange, 'minutes', shouldAdd));

                        //get events in selected time range for array of calendars

                        pArray = calendarsIds.map(function () {
                            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(calObj) {
                                var freeSlotObject, events;
                                return _regenerator2.default.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                freeSlotObject = {};
                                                _context3.next = 3;
                                                return (0, _googleCalendarApiHandler.getGoogleCalendarEvents)(calObj.id, startTime, endTime);

                                            case 3:
                                                events = _context3.sent;


                                                freeSlotObject.room_name = calObj.name;
                                                freeSlotObject.room_id = calObj.id;
                                                freeSlotObject.free_slots = [];

                                                //if there are busy slots in  calendar time range - calculate free slots
                                                if (events && events.length) {
                                                    freeSlotObject.free_slots = (0, _general.getTimeRangeFreeSlots)(startTime, endTime, events);
                                                } else {
                                                    //if not busy slots in calendar time range - set fee slot from startTima to endTime
                                                    freeSlotObject.free_slots.push({
                                                        start: startTime,
                                                        end: endTime
                                                    });
                                                }

                                                return _context3.abrupt("return", freeSlotObject);

                                            case 9:
                                            case "end":
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, _this);
                            }));

                            return function (_x4) {
                                return _ref4.apply(this, arguments);
                            };
                        }());
                        _context4.next = 12;
                        return Promise.all(pArray);

                    case 12:
                        freeSlots = _context4.sent;

                        result = [{ "event": "slot", "name": "rooms_free_slots", "value": freeSlots, "timestamp": Date.now() }];

                        return _context4.abrupt("return", result);

                    case 15:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function generateFreeSlots(_x3) {
        return _ref3.apply(this, arguments);
    };
}();

var _intents = require("../constants/intents");

var _intents2 = _interopRequireDefault(_intents);

var _logger = require("../utils/logger");

var _googleCalendarApiHandler = require("./googleCalendarApiHandler");

var _lodash = require("lodash");

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _general = require("./general");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkCpecifiedRoomExists(queryData) {
    var result = [];
    var exists = (0, _general.getCalendarId)(queryData.roomName);

    if (exists) {
        result = [{ "event": "slot", "name": "is_room_exists", "value": true, "timestamp": Date.now() }];
    } else {
        result = [{ "event": "slot", "name": "is_room_exists", "value": false, "timestamp": Date.now() }];
    }

    return result;
}

exports.processActionIntent = processActionIntent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2FjdGlvblByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJuZXh0QWN0aW9uRGF0YSIsImV2ZW50cyIsInF1ZXJ5RGF0YSIsIm5leHRBY3Rpb24iLCJhY3Rpb25JbnRlbnRzIiwiYWN0aW9uX2NyZWF0ZV9ldmVudCIsImFjdGlvbl91cGRhdGVfZXZlbnQiLCJhY3Rpb25fcmVtb3ZlX2V2ZW50IiwiYWN0aW9uX3Nob3dfbXlfZXZlbnRzIiwiYWN0aW9uX2hlbHAiLCJhY3Rpb25fY2hlY2tfcm9vbV9hdmFpbGFibGUiLCJhY3Rpb25fY2hlY2tfcm9vbV9leGlzdHMiLCJhY3Rpb25fZ2V0X3Jvb21fZnJlZV9zbG90cyIsInJvb21OYW1lIiwic2xvdHMiLCJyb29tX25hbWUiLCJ0aW1lIiwiY2hlY2tDcGVjaWZpZWRSb29tQXZhaWxhYmxlIiwiY2hlY2tDcGVjaWZpZWRSb29tRXhpc3RzIiwiZ2VuZXJhdGVGcmVlU2xvdHMiLCJwcm9jZXNzQWN0aW9uSW50ZW50IiwicmVzdWx0Iiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImNhbGVuZGFySWQiLCJmcm9tIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidG8iLCJjb25maWciLCJtaW5EdXJhdGlvbkF2YWlsYWJsZU1pbiIsImxlbmd0aCIsIm5vdyIsInNob3VsZEFkZCIsIm1pbnV0ZXNSYW5nZSIsImZyZWVTcGFjZVNlYXJjaFRpbWVSYW5nZU1pbnMiLCJmcmVlU2xvdHMiLCJjYWxlbmRhcnNJZHMiLCJwQXJyYXkiLCJtYXAiLCJjYWxPYmoiLCJmcmVlU2xvdE9iamVjdCIsImlkIiwibmFtZSIsInJvb21faWQiLCJmcmVlX3Nsb3RzIiwicHVzaCIsInN0YXJ0IiwiZW5kIiwiUHJvbWlzZSIsImFsbCIsImV4aXN0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBUUE7O3dGQUNBLGlCQUFtQ0EsY0FBbkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1FDLDhCQURSLEdBQ2lCLEVB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NEJBZm5CO0FBQUE7QUFBQSwrQkFxQ3NCUSxRQUFRQyxHQUFSLENBQVlaLE1BQVosQ0FyQ3RCOztBQUFBO0FBcUNJRixpQ0FyQ0o7O0FBc0NJZixpQ0FBUyxDQUNMLEVBQUMsU0FBUyxNQUFWLEVBQWtCLFFBQVEsa0JBQTFCLEVBQThDLFNBQVNlLFNBQXZELEVBQWtFLGFBQWFWLEtBQUtNLEdBQUwsRUFBL0UsRUFESyxDQUFUOztBQXRDSiwwREEwQ1dYLE1BMUNYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEs7O29CQUFlRixpQjs7Ozs7QUF2SWY7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBdUVBLFNBQVNELHdCQUFULENBQWtDaEIsU0FBbEMsRUFBNkM7QUFDekMsUUFBSW1CLFNBQVMsRUFBYjtBQUNBLFFBQUk4QixTQUFTLDRCQUFjakQsVUFBVVcsUUFBeEIsQ0FBYjs7QUFFQSxRQUFJc0MsTUFBSixFQUFZO0FBQ1I5QixpQkFBUyxDQUNMLEVBQUMsU0FBUyxNQUFWLEVBQWtCLFFBQVEsZ0JBQTFCLEVBQTRDLFNBQVMsSUFBckQsRUFBMkQsYUFBYUssS0FBS00sR0FBTCxFQUF4RSxFQURLLENBQVQ7QUFHSCxLQUpELE1BSU87QUFDSFgsaUJBQVMsQ0FDTCxFQUFDLFNBQVMsTUFBVixFQUFrQixRQUFRLGdCQUExQixFQUE0QyxTQUFTLEtBQXJELEVBQTRELGFBQWFLLEtBQUtNLEdBQUwsRUFBekUsRUFESyxDQUFUO0FBR0g7O0FBRUQsV0FBT1gsTUFBUDtBQUNIOztRQTBGT0QsbUIsR0FBQUEsbUIiLCJmaWxlIjoiYWN0aW9uUHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFjdGlvbkludGVudHMgZnJvbSBcIi4uL2NvbnN0YW50cy9pbnRlbnRzXCI7XG5pbXBvcnQge2xvZ0luZm8sIGxvZ0Vycm9yfSBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XG5pbXBvcnQge2dldEdvb2dsZUNhbGVuZGFyRXZlbnRzfSBmcm9tICcuL2dvb2dsZUNhbGVuZGFyQXBpSGFuZGxlcic7XG5pbXBvcnQge2lzUGxhaW5PYmplY3R9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge2dldERhdGVXaXRoRHVyYXRpb25JU09TdHJpbmcsIGdldENhbGVuZGFySWQsIGFnZ3JlZ2F0ZUNhbGVuZGFySWRzLCBnZXRUaW1lUmFuZ2VGcmVlU2xvdHMsIGdldFF1ZXJpZWRWYWxpZFRpbWV9IGZyb20gJy4vZ2VuZXJhbCc7XG5cblxuLy9wcm9jZXNzIGN1c3RvbSBhY3Rpb25cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NBY3Rpb25JbnRlbnQobmV4dEFjdGlvbkRhdGEpIHtcbiAgICBsZXQgZXZlbnRzID0gW107XG5cbiAgICBsZXQgcXVlcnlEYXRhO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgc3dpdGNoIChuZXh0QWN0aW9uRGF0YS5uZXh0QWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIGFjdGlvbkludGVudHMuYWN0aW9uX2NyZWF0ZV9ldmVudDpcbiAgICAgICAgICAgICAgICAvL1RPRE86IG1ha2UgSW50ZW50QWN0aW9uIHByb2Nlc3NvciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgbG9nSW5mbygncGVyZm9ybWluZyBhY3Rpb25fY3JlYXRlX2V2ZW50IC4uLicpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhY3Rpb25JbnRlbnRzLmFjdGlvbl91cGRhdGVfZXZlbnQ6XG4gICAgICAgICAgICAgICAgLy9UT0RPOiBtYWtlIEludGVudEFjdGlvbiBwcm9jZXNzb3IgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICAgIGxvZ0luZm8oJ3BlcmZvcm1pbmcgYWN0aW9uX3VwZGF0ZV9ldmVudCAuLi4nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYWN0aW9uSW50ZW50cy5hY3Rpb25fcmVtb3ZlX2V2ZW50OlxuICAgICAgICAgICAgICAgIC8vVE9ETzogbWFrZSBJbnRlbnRBY3Rpb24gcHJvY2Vzc29yIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICBsb2dJbmZvKCdwZXJmb3JtaW5nIGFjdGlvbl9yZW1vdmVfZXZlbnQgLi4uJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGFjdGlvbkludGVudHMuYWN0aW9uX3Nob3dfbXlfZXZlbnRzOlxuICAgICAgICAgICAgICAgIGxvZ0luZm8oJ3BlcmZvcm1pbmcgYWN0aW9uX3Nob3dfZXZlbnRzIC4uLicpO1xuICAgICAgICAgICAgICAgIC8vVE9ETzogbWFrZSBJbnRlbnRBY3Rpb24gcHJvY2Vzc29yIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYWN0aW9uSW50ZW50cy5hY3Rpb25faGVscDpcbiAgICAgICAgICAgICAgICBsb2dJbmZvKCdwZXJmb3JtaW5nIGFjdGlvbl9oZWxwIC4uLicpO1xuICAgICAgICAgICAgICAgIC8vVE9ETzogbWFrZSBJbnRlbnRBY3Rpb24gcHJvY2Vzc29yIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYWN0aW9uSW50ZW50cy5hY3Rpb25fY2hlY2tfcm9vbV9hdmFpbGFibGU6XG4gICAgICAgICAgICAgICAgcXVlcnlEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICByb29tTmFtZTogbmV4dEFjdGlvbkRhdGEuc2xvdHMucm9vbV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBnZXRRdWVyaWVkVmFsaWRUaW1lKG5leHRBY3Rpb25EYXRhLnNsb3RzLnRpbWUpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsb2dJbmZvKCdwZXJmb3JtaW5nIGFjdGlvbl9jaGVja19yb29tX2F2YWlsYWJsZSAuLi4nKTtcbiAgICAgICAgICAgICAgICBldmVudHMgPSBhd2FpdCBjaGVja0NwZWNpZmllZFJvb21BdmFpbGFibGUocXVlcnlEYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYWN0aW9uSW50ZW50cy5hY3Rpb25fY2hlY2tfcm9vbV9leGlzdHM6XG4gICAgICAgICAgICAgICAgcXVlcnlEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICByb29tTmFtZTogbmV4dEFjdGlvbkRhdGEuc2xvdHMucm9vbV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBnZXRRdWVyaWVkVmFsaWRUaW1lKG5leHRBY3Rpb25EYXRhLnNsb3RzLnRpbWUpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsb2dJbmZvKCdwZXJmb3JtaW5nIGFjdGlvbl9jaGVja19yb29tX2V4aXN0cyAuLi4nKTtcbiAgICAgICAgICAgICAgICBldmVudHMgPSBjaGVja0NwZWNpZmllZFJvb21FeGlzdHMocXVlcnlEYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYWN0aW9uSW50ZW50cy5hY3Rpb25fZ2V0X3Jvb21fZnJlZV9zbG90czpcbiAgICAgICAgICAgICAgICBsb2dJbmZvKCdwZXJmb3JtaW5nIGFjdGlvbl9nZXRfcm9vbV9mcmVlX3Nsb3RzIC4uLicpO1xuICAgICAgICAgICAgICAgIHF1ZXJ5RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgcm9vbU5hbWU6IG5leHRBY3Rpb25EYXRhLnNsb3RzLnJvb21fbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdGltZTogZ2V0UXVlcmllZFZhbGlkVGltZShuZXh0QWN0aW9uRGF0YS5zbG90cy50aW1lKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZXZlbnRzID0gYXdhaXQgZ2VuZXJhdGVGcmVlU2xvdHMocXVlcnlEYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBsb2dJbmZvKCdwZXJmb3JtaW5nIGRlZmF1bHQgYWN0aW9uIC4uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgfVxufVxuXG4vLyBhc3luYyBmdW5jdGlvbiBzaG93RXZlbnRzKCkge1xuLy8gICAgIGxldCBldmVudHMgPSBhd2FpdCBnZXRHb29nbGVDYWxlbmRhckV2ZW50cygpO1xuLy8gICAgIHJldHVybiBldmVudHM7XG4vLyB9XG5cbmZ1bmN0aW9uIGNoZWNrQ3BlY2lmaWVkUm9vbUV4aXN0cyhxdWVyeURhdGEpIHtcbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgbGV0IGV4aXN0cyA9IGdldENhbGVuZGFySWQocXVlcnlEYXRhLnJvb21OYW1lKTtcblxuICAgIGlmIChleGlzdHMpIHtcbiAgICAgICAgcmVzdWx0ID0gW1xuICAgICAgICAgICAge1wiZXZlbnRcIjogXCJzbG90XCIsIFwibmFtZVwiOiBcImlzX3Jvb21fZXhpc3RzXCIsIFwidmFsdWVcIjogdHJ1ZSwgXCJ0aW1lc3RhbXBcIjogRGF0ZS5ub3coKX0sXG4gICAgICAgIF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gW1xuICAgICAgICAgICAge1wiZXZlbnRcIjogXCJzbG90XCIsIFwibmFtZVwiOiBcImlzX3Jvb21fZXhpc3RzXCIsIFwidmFsdWVcIjogZmFsc2UsIFwidGltZXN0YW1wXCI6IERhdGUubm93KCl9LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrQ3BlY2lmaWVkUm9vbUF2YWlsYWJsZShxdWVyeURhdGEpIHtcbiAgICBjb25zdCB0aW1lID0gcXVlcnlEYXRhLnRpbWU7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGxldCBzdGFydFRpbWU7XG4gICAgbGV0IGVuZFRpbWU7XG4gICAgbGV0IGNhbGVuZGFySWQgPSBnZXRDYWxlbmRhcklkKHF1ZXJ5RGF0YS5yb29tTmFtZSk7XG4gICAgbGV0IGV2ZW50cztcblxuICAgIGxvZ0luZm8oYENoZWNraW5nIGlmIHJvb20gYXZhaWxhYmxlLCByb29tIG5hbWU6ICR7cXVlcnlEYXRhLnJvb21OYW1lfSwgYW5kIHRpbWU6ICR7cXVlcnlEYXRhLnRpbWV9YCk7XG4gICAgLy9SQVNBLWNvcmUgY2FuIHJldHVybiAgVGltZSBzbG90IGFzIHN0cmluZyBvciBhcyBPYmplY3QoZnJvbTonJywgdG86ICcnKSBtYW5hZ2UgaGFuZGxlIGV4YWN0IHRpbWUgb3IgdGltZSByYW5nZS5cblxuICAgIGlmICh0aW1lKSB7XG4gICAgICAgIGlmIChpc1BsYWluT2JqZWN0KHRpbWUpKSB7XG4gICAgICAgICAgICBzdGFydFRpbWUgPSB0aW1lLmZyb20gfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgZW5kVGltZSA9IHRpbWUudG8gfHwgZ2V0RGF0ZVdpdGhEdXJhdGlvbklTT1N0cmluZyhzdGFydFRpbWUsIGNvbmZpZy5taW5EdXJhdGlvbkF2YWlsYWJsZU1pbiwgJ21pbnV0ZXMnLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHRpbWU7XG4gICAgICAgICAgICBlbmRUaW1lID0gZ2V0RGF0ZVdpdGhEdXJhdGlvbklTT1N0cmluZyhzdGFydFRpbWUsIGNvbmZpZy5taW5EdXJhdGlvbkF2YWlsYWJsZU1pbiwgJ21pbnV0ZXMnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgZW5kVGltZSA9IGdldERhdGVXaXRoRHVyYXRpb25JU09TdHJpbmcoc3RhcnRUaW1lLCBjb25maWcubWluRHVyYXRpb25BdmFpbGFibGVNaW4sICdtaW51dGVzJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZXZlbnRzID0gYXdhaXQgZ2V0R29vZ2xlQ2FsZW5kYXJFdmVudHMoY2FsZW5kYXJJZCwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcblxuICAgIC8vIGlmIHRoZXJlIGFyZSBldmVudCBvbiByZXF1ZXN0ZWQgdGltZSAtIHNlbmQgcm9vbSBpcyBidXN5LCBlbHNlIC0gc2VuZCByb29tIGlzIGZyZWVcbiAgICBpZiAoZXZlbnRzICYmIGV2ZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcmVzdWx0ID0gW1xuICAgICAgICAgICAge1wiZXZlbnRcIjogXCJzbG90XCIsIFwibmFtZVwiOiBcImlzX3Jvb21fYXZhaWxhYmxlXCIsIFwidmFsdWVcIjogZmFsc2UsIFwidGltZXN0YW1wXCI6IERhdGUubm93KCl9LFxuICAgICAgICAgICAge1wiZXZlbnRcIjogXCJzbG90XCIsIFwibmFtZVwiOiBcInRpbWVcIiwgXCJ2YWx1ZVwiOiBzdGFydFRpbWUsIFwidGltZXN0YW1wXCI6IERhdGUubm93KCl9LFxuICAgICAgICBdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IFtcbiAgICAgICAgICAgIHtcImV2ZW50XCI6IFwic2xvdFwiLCBcIm5hbWVcIjogXCJpc19yb29tX2F2YWlsYWJsZVwiLCBcInZhbHVlXCI6IHRydWUsIFwidGltZXN0YW1wXCI6IERhdGUubm93KCl9LFxuICAgICAgICAgICAge1wiZXZlbnRcIjogXCJzbG90XCIsIFwibmFtZVwiOiBcInRpbWVcIiwgXCJ2YWx1ZVwiOiBzdGFydFRpbWUsIFwidGltZXN0YW1wXCI6IERhdGUubm93KCl9LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlRnJlZVNsb3RzKHF1ZXJ5RGF0YSkge1xuICAgIGxvZ0luZm8oJ2dlbmVyYXRlIGZyZWUgc2xvdHMuIFJvb20gbmFtZXM6ICcsIHF1ZXJ5RGF0YS5yb29tTmFtZSk7XG4gICAgY29uc3Qgcm9vbU5hbWUgPSBxdWVyeURhdGEucm9vbU5hbWU7XG4gICAgY29uc3Qgc2hvdWxkQWRkID0gdHJ1ZTtcbiAgICBjb25zdCBtaW51dGVzUmFuZ2UgPSBjb25maWcuZnJlZVNwYWNlU2VhcmNoVGltZVJhbmdlTWlucztcbiAgICBsZXQgcmVzdWx0O1xuICAgIGxldCBmcmVlU2xvdHMgPSBbXTtcblxuICAgIGNvbnN0IGNhbGVuZGFyc0lkcyA9IGFnZ3JlZ2F0ZUNhbGVuZGFySWRzKHJvb21OYW1lKTtcbiAgICBjb25zdCBzdGFydFRpbWUgPSBnZXRRdWVyaWVkVmFsaWRUaW1lKGdldERhdGVXaXRoRHVyYXRpb25JU09TdHJpbmcocXVlcnlEYXRhLnRpbWUgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCBtaW51dGVzUmFuZ2UsICdtaW51dGVzJyxcbiAgICAgICAgIXNob3VsZEFkZCkpO1xuICAgIGNvbnN0IGVuZFRpbWUgPSBnZXRRdWVyaWVkVmFsaWRUaW1lKGdldERhdGVXaXRoRHVyYXRpb25JU09TdHJpbmcocXVlcnlEYXRhLnRpbWUgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCBtaW51dGVzUmFuZ2UsICdtaW51dGVzJyxcbiAgICAgICAgc2hvdWxkQWRkKSk7XG5cbiAgICAvL2dldCBldmVudHMgaW4gc2VsZWN0ZWQgdGltZSByYW5nZSBmb3IgYXJyYXkgb2YgY2FsZW5kYXJzXG4gICAgY29uc3QgcEFycmF5ID0gY2FsZW5kYXJzSWRzLm1hcChhc3luYyBjYWxPYmogPT4ge1xuICAgICAgICBsZXQgZnJlZVNsb3RPYmplY3QgPSB7fTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gYXdhaXQgZ2V0R29vZ2xlQ2FsZW5kYXJFdmVudHMoY2FsT2JqLmlkLCBzdGFydFRpbWUsIGVuZFRpbWUpO1xuXG4gICAgICAgIGZyZWVTbG90T2JqZWN0LnJvb21fbmFtZSA9IGNhbE9iai5uYW1lO1xuICAgICAgICBmcmVlU2xvdE9iamVjdC5yb29tX2lkID0gY2FsT2JqLmlkO1xuICAgICAgICBmcmVlU2xvdE9iamVjdC5mcmVlX3Nsb3RzID0gW107XG5cbiAgICAgICAgLy9pZiB0aGVyZSBhcmUgYnVzeSBzbG90cyBpbiAgY2FsZW5kYXIgdGltZSByYW5nZSAtIGNhbGN1bGF0ZSBmcmVlIHNsb3RzXG4gICAgICAgIGlmIChldmVudHMgJiYgZXZlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZnJlZVNsb3RPYmplY3QuZnJlZV9zbG90cyA9IGdldFRpbWVSYW5nZUZyZWVTbG90cyhzdGFydFRpbWUsIGVuZFRpbWUsIGV2ZW50cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL2lmIG5vdCBidXN5IHNsb3RzIGluIGNhbGVuZGFyIHRpbWUgcmFuZ2UgLSBzZXQgZmVlIHNsb3QgZnJvbSBzdGFydFRpbWEgdG8gZW5kVGltZVxuICAgICAgICAgICAgZnJlZVNsb3RPYmplY3QuZnJlZV9zbG90cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgIGVuZDogZW5kVGltZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcmVlU2xvdE9iamVjdDtcbiAgICB9KTtcblxuICAgIGZyZWVTbG90cyA9IGF3YWl0IFByb21pc2UuYWxsKHBBcnJheSk7XG4gICAgcmVzdWx0ID0gW1xuICAgICAgICB7XCJldmVudFwiOiBcInNsb3RcIiwgXCJuYW1lXCI6IFwicm9vbXNfZnJlZV9zbG90c1wiLCBcInZhbHVlXCI6IGZyZWVTbG90cywgXCJ0aW1lc3RhbXBcIjogRGF0ZS5ub3coKX1cbiAgICBdO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5leHBvcnQge3Byb2Nlc3NBY3Rpb25JbnRlbnR9XG4iXX0=