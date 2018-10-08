"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getGoogleCalendarEvents = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getGoogleCalendarEvents = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(calendarId, startTime, endTime) {
        var content, oAuth2Client, events;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        (0, _logger.logInfo)('In googleCalendarApiHandler: get all events');

                        _context.next = 3;
                        return (0, _fileSys.readFileSync)(currentPath + "/creds/credentials.json");

                    case 3:
                        content = _context.sent;
                        _context.next = 6;
                        return authorize(JSON.parse(content));

                    case 6:
                        oAuth2Client = _context.sent;
                        _context.next = 9;
                        return listEvents(oAuth2Client, calendarId, startTime, endTime);

                    case 9:
                        events = _context.sent;
                        return _context.abrupt("return", events);

                    case 11:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getGoogleCalendarEvents(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * returns the busy time slots in startTime and endTime ranges
 */
// async function getFreeBusySlots(calendarsIds, startTime, endTime) {
//     logInfo('In googleCalendarApiHandler: get freebusy slots');
//
//     try {
//         let content = await readFileSync(`${currentPath}/../creds/credentials.json`);
//         // Authorize a client with credentials, then call the Google Calendar API.
//         const oAuth2Client = await authorize(JSON.parse(content));
//         const slots = await getFreeBusyCalendars(oAuth2Client, calendarsIds, startTime, endTime);
//
//         return slots;
//     } catch(err) {
//         logError(err);
//     }
//
// }


// async function getFreeBusyCalendars(auth, calendarsIds, startTime, endTime) {
//     const calendar = google.calendar({version: 'v3', auth});
//     const check = {
//         resource: {
//             auth: auth,
//             timeMax: endTime,
//             timeMin: startTime,
//             items: calendarsIds,
//             timeZone: config.userTimeZone,
//         }
//     };
//
//     return new Promise((resolve, reject) => {
//         calendar.freebusy.query(check, (err, res) => {
//             if (err) {
//                 reject('The API returned an error: ' + err);
//                 return;
//             }
//
//             resolve(res.data.calendars);
//         })
//     })
// }

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
var listEvents = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(auth, calendarId, startTime, endTime) {
        var calendar;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        calendar = google.calendar({ version: 'v3', auth: auth });
                        return _context2.abrupt("return", new Promise(function (resolve, reject) {
                            calendar.events.list({
                                calendarId: calendarId,
                                timeMin: startTime || new Date().toISOString(),
                                timeMax: endTime,
                                maxResults: 10,
                                singleEvents: true,
                                orderBy: 'startTime'
                            }, function (err, res) {
                                if (err) {
                                    reject('The API returned an error: ' + err);
                                    return;
                                }

                                resolve(res.data.items);
                            });
                        }));

                    case 2:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function listEvents(_x4, _x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */


var authorize = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(credentials) {
        var _credentials$installe, client_secret, client_id, redirect_uris, oAuth2Client, token;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _credentials$installe = credentials.installed, client_secret = _credentials$installe.client_secret, client_id = _credentials$installe.client_id, redirect_uris = _credentials$installe.redirect_uris;
                        oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
                        _context3.next = 4;
                        return (0, _fileSys.readFileSync)(currentPath + "/creds/" + TOKEN_PATH);

                    case 4:
                        token = _context3.sent;

                        oAuth2Client.setCredentials(JSON.parse(token));

                        return _context3.abrupt("return", oAuth2Client);

                    case 7:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function authorize(_x8) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
// function getAccessToken(oAuth2Client, callback) {
//     const authUrl = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: SCOPES,
//     });
//     console.log('Authorize this app by visiting this url:', authUrl);
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });
//     rl.question('Enter the code from that page here: ', (code) => {
//         rl.close();
//         oAuth2Client.getToken(code, (err, token) => {
//             if (err) return console.error('Error retrieving access token', err);
//             oAuth2Client.setCredentials(token);
//             // Store the token to disk for later program executions
//             fs.writeFile(`${__dirname}/TOKEN_PATH`, JSON.stringify(token), (err) => {
//                 if (err) console.error(err);
//                 console.log('Token stored to', TOKEN_PATH);
//             });
//             callback(oAuth2Client);
//         });
//     });
// }


var _logger = require("../utils/logger");

var _fileSys = require("../utils/fileSys");

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var readline = require('readline');

var _require = require('googleapis'),
    google = _require.google;
// If modifying these scopes, delete token.json.


var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_PATH = 'token.json';
var currentPath = path.dirname(__filename);

function createGoogleCalendarEvent() {
    (0, _logger.logInfo)('In googleCalendarApiHandler: create vent');
}exports.getGoogleCalendarEvents = getGoogleCalendarEvents;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2dvb2dsZUNhbGVuZGFyQXBpSGFuZGxlci5qcyJdLCJuYW1lcyI6WyJjYWxlbmRhcklkIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImN1cnJlbnRQYXRoIiwiY29udGVudCIsImF1dGhvcml6ZSIsIkpTT04iLCJwYXJzZSIsIm9BdXRoMkNsaWVudCIsImxpc3RFdmVudHMiLCJldmVudHMiLCJnZXRHb29nbGVDYWxlbmRhckV2ZW50cyIsImF1dGgiLCJjYWxlbmRhciIsImdvb2dsZSIsInZlcnNpb24iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImxpc3QiLCJ0aW1lTWluIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwidGltZU1heCIsIm1heFJlc3VsdHMiLCJzaW5nbGVFdmVudHMiLCJvcmRlckJ5IiwiZXJyIiwicmVzIiwiZGF0YSIsIml0ZW1zIiwiY3JlZGVudGlhbHMiLCJpbnN0YWxsZWQiLCJjbGllbnRfc2VjcmV0IiwiY2xpZW50X2lkIiwicmVkaXJlY3RfdXJpcyIsIk9BdXRoMiIsIlRPS0VOX1BBVEgiLCJ0b2tlbiIsInNldENyZWRlbnRpYWxzIiwicGF0aCIsInJlcXVpcmUiLCJyZWFkbGluZSIsIlNDT1BFUyIsImRpcm5hbWUiLCJfX2ZpbGVuYW1lIiwiY3JlYXRlR29vZ2xlQ2FsZW5kYXJFdmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozt3RkFZQSxpQkFBdUNBLFVBQXZDLEVBQW1EQyxTQUFuRCxFQUE4REMsT0FBOUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0ksNkNBQVEsNkNBQVI7O0FBREo7QUFBQSwrQkFHd0IsMkJBQWdCQyxXQUFoQiw2QkFIeEI7O0FBQUE7QUFHUUMsK0JBSFI7QUFBQTtBQUFBLCtCQUsrQkMsVUFBVUMsS0FBS0MsS0FBTCxDQUFXSCxPQUFYLENBQVYsQ0FML0I7O0FBQUE7QUFLVUksb0NBTFY7QUFBQTtBQUFBLCtCQU15QkMsV0FBV0QsWUFBWCxFQUF5QlIs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QztBQUNqQyx5QkFBUSwwQ0FBUjtBQUNILEMsUUE4RU9uQyx1QixHQUFBQSx1QiIsImZpbGUiOiJnb29nbGVDYWxlbmRhckFwaUhhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2xvZ0luZm8sIGxvZ0Vycm9yfSBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XG5pbXBvcnQge3JlYWRGaWxlU3luY30gZnJvbSBcIi4uL3V0aWxzL2ZpbGVTeXNcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uL2NvbmZpZ1wiO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgcmVhZGxpbmUgPSByZXF1aXJlKCdyZWFkbGluZScpO1xuY29uc3Qge2dvb2dsZX0gPSByZXF1aXJlKCdnb29nbGVhcGlzJyk7XG4vLyBJZiBtb2RpZnlpbmcgdGhlc2Ugc2NvcGVzLCBkZWxldGUgdG9rZW4uanNvbi5cbmNvbnN0IFNDT1BFUyA9IFsnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9jYWxlbmRhci5yZWFkb25seSddO1xuY29uc3QgVE9LRU5fUEFUSCA9ICd0b2tlbi5qc29uJztcbmNvbnN0IGN1cnJlbnRQYXRoID0gcGF0aC5kaXJuYW1lKF9fZmlsZW5hbWUpO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRHb29nbGVDYWxlbmRhckV2ZW50cyhjYWxlbmRhcklkLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgICBsb2dJbmZvKCdJbiBnb29nbGVDYWxlbmRhckFwaUhhbmRsZXI6IGdldCBhbGwgZXZlbnRzJyk7XG5cbiAgICBsZXQgY29udGVudCA9IGF3YWl0IHJlYWRGaWxlU3luYyhgJHtjdXJyZW50UGF0aH0vY3JlZHMvY3JlZGVudGlhbHMuanNvbmApO1xuICAgIC8vIEF1dGhvcml6ZSBhIGNsaWVudCB3aXRoIGNyZWRlbnRpYWxzLCB0aGVuIGNhbGwgdGhlIEdvb2dsZSBDYWxlbmRhciBBUEkuXG4gICAgY29uc3Qgb0F1dGgyQ2xpZW50ID0gYXdhaXQgYXV0aG9yaXplKEpTT04ucGFyc2UoY29udGVudCkpO1xuICAgIGNvbnN0IGV2ZW50cyA9IGF3YWl0IGxpc3RFdmVudHMob0F1dGgyQ2xpZW50LCBjYWxlbmRhcklkLCBzdGFydFRpbWUsIGVuZFRpbWUpO1xuXG4gICAgcmV0dXJuIGV2ZW50cztcbn1cblxuLyoqXG4gKiByZXR1cm5zIHRoZSBidXN5IHRpbWUgc2xvdHMgaW4gc3RhcnRUaW1lIGFuZCBlbmRUaW1lIHJhbmdlc1xuICovXG4vLyBhc3luYyBmdW5jdGlvbiBnZXRGcmVlQnVzeVNsb3RzKGNhbGVuZGFyc0lkcywgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4vLyAgICAgbG9nSW5mbygnSW4gZ29vZ2xlQ2FsZW5kYXJBcGlIYW5kbGVyOiBnZXQgZnJlZWJ1c3kgc2xvdHMnKTtcbi8vXG4vLyAgICAgdHJ5IHtcbi8vICAgICAgICAgbGV0IGNvbnRlbnQgPSBhd2FpdCByZWFkRmlsZVN5bmMoYCR7Y3VycmVudFBhdGh9Ly4uL2NyZWRzL2NyZWRlbnRpYWxzLmpzb25gKTtcbi8vICAgICAgICAgLy8gQXV0aG9yaXplIGEgY2xpZW50IHdpdGggY3JlZGVudGlhbHMsIHRoZW4gY2FsbCB0aGUgR29vZ2xlIENhbGVuZGFyIEFQSS5cbi8vICAgICAgICAgY29uc3Qgb0F1dGgyQ2xpZW50ID0gYXdhaXQgYXV0aG9yaXplKEpTT04ucGFyc2UoY29udGVudCkpO1xuLy8gICAgICAgICBjb25zdCBzbG90cyA9IGF3YWl0IGdldEZyZWVCdXN5Q2FsZW5kYXJzKG9BdXRoMkNsaWVudCwgY2FsZW5kYXJzSWRzLCBzdGFydFRpbWUsIGVuZFRpbWUpO1xuLy9cbi8vICAgICAgICAgcmV0dXJuIHNsb3RzO1xuLy8gICAgIH0gY2F0Y2goZXJyKSB7XG4vLyAgICAgICAgIGxvZ0Vycm9yKGVycik7XG4vLyAgICAgfVxuLy9cbi8vIH1cblxuXG4vLyBhc3luYyBmdW5jdGlvbiBnZXRGcmVlQnVzeUNhbGVuZGFycyhhdXRoLCBjYWxlbmRhcnNJZHMsIHN0YXJ0VGltZSwgZW5kVGltZSkge1xuLy8gICAgIGNvbnN0IGNhbGVuZGFyID0gZ29vZ2xlLmNhbGVuZGFyKHt2ZXJzaW9uOiAndjMnLCBhdXRofSk7XG4vLyAgICAgY29uc3QgY2hlY2sgPSB7XG4vLyAgICAgICAgIHJlc291cmNlOiB7XG4vLyAgICAgICAgICAgICBhdXRoOiBhdXRoLFxuLy8gICAgICAgICAgICAgdGltZU1heDogZW5kVGltZSxcbi8vICAgICAgICAgICAgIHRpbWVNaW46IHN0YXJ0VGltZSxcbi8vICAgICAgICAgICAgIGl0ZW1zOiBjYWxlbmRhcnNJZHMsXG4vLyAgICAgICAgICAgICB0aW1lWm9uZTogY29uZmlnLnVzZXJUaW1lWm9uZSxcbi8vICAgICAgICAgfVxuLy8gICAgIH07XG4vL1xuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4vLyAgICAgICAgIGNhbGVuZGFyLmZyZWVidXN5LnF1ZXJ5KGNoZWNrLCAoZXJyLCByZXMpID0+IHtcbi8vICAgICAgICAgICAgIGlmIChlcnIpIHtcbi8vICAgICAgICAgICAgICAgICByZWplY3QoJ1RoZSBBUEkgcmV0dXJuZWQgYW4gZXJyb3I6ICcgKyBlcnIpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhLmNhbGVuZGFycyk7XG4vLyAgICAgICAgIH0pXG4vLyAgICAgfSlcbi8vIH1cblxuZnVuY3Rpb24gY3JlYXRlR29vZ2xlQ2FsZW5kYXJFdmVudCgpIHtcbiAgICBsb2dJbmZvKCdJbiBnb29nbGVDYWxlbmRhckFwaUhhbmRsZXI6IGNyZWF0ZSB2ZW50Jyk7XG59XG5cblxuLyoqXG4gKiBMaXN0cyB0aGUgbmV4dCAxMCBldmVudHMgb24gdGhlIHVzZXIncyBwcmltYXJ5IGNhbGVuZGFyLlxuICogQHBhcmFtIHtnb29nbGUuYXV0aC5PQXV0aDJ9IGF1dGggQW4gYXV0aG9yaXplZCBPQXV0aDIgY2xpZW50LlxuICovXG5hc3luYyBmdW5jdGlvbiBsaXN0RXZlbnRzKGF1dGgsIGNhbGVuZGFySWQsIHN0YXJ0VGltZSwgZW5kVGltZSkge1xuICAgIGNvbnN0IGNhbGVuZGFyID0gZ29vZ2xlLmNhbGVuZGFyKHt2ZXJzaW9uOiAndjMnLCBhdXRofSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjYWxlbmRhci5ldmVudHMubGlzdCh7XG4gICAgICAgICAgICBjYWxlbmRhcklkOiBjYWxlbmRhcklkLFxuICAgICAgICAgICAgdGltZU1pbjogc3RhcnRUaW1lIHx8IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgIHRpbWVNYXg6IGVuZFRpbWUsXG4gICAgICAgICAgICBtYXhSZXN1bHRzOiAxMCxcbiAgICAgICAgICAgIHNpbmdsZUV2ZW50czogdHJ1ZSxcbiAgICAgICAgICAgIG9yZGVyQnk6ICdzdGFydFRpbWUnLFxuICAgICAgICB9LCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoJ1RoZSBBUEkgcmV0dXJuZWQgYW4gZXJyb3I6ICcgKyBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YS5pdGVtcyk7XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gT0F1dGgyIGNsaWVudCB3aXRoIHRoZSBnaXZlbiBjcmVkZW50aWFscywgYW5kIHRoZW4gZXhlY3V0ZSB0aGVcbiAqIGdpdmVuIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IGNyZWRlbnRpYWxzIFRoZSBhdXRob3JpemF0aW9uIGNsaWVudCBjcmVkZW50aWFscy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byBjYWxsIHdpdGggdGhlIGF1dGhvcml6ZWQgY2xpZW50LlxuICovXG5hc3luYyBmdW5jdGlvbiBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICBjb25zdCB7Y2xpZW50X3NlY3JldCwgY2xpZW50X2lkLCByZWRpcmVjdF91cmlzfSA9IGNyZWRlbnRpYWxzLmluc3RhbGxlZDtcbiAgICBjb25zdCBvQXV0aDJDbGllbnQgPSBuZXcgZ29vZ2xlLmF1dGguT0F1dGgyKFxuICAgICAgICBjbGllbnRfaWQsIGNsaWVudF9zZWNyZXQsIHJlZGlyZWN0X3VyaXNbMF0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCByZWFkRmlsZVN5bmMoYCR7Y3VycmVudFBhdGh9L2NyZWRzLyR7VE9LRU5fUEFUSH1gKTtcbiAgICBvQXV0aDJDbGllbnQuc2V0Q3JlZGVudGlhbHMoSlNPTi5wYXJzZSh0b2tlbikpO1xuXG4gICAgcmV0dXJuIG9BdXRoMkNsaWVudDtcbn1cblxuLyoqXG4gKiBHZXQgYW5kIHN0b3JlIG5ldyB0b2tlbiBhZnRlciBwcm9tcHRpbmcgZm9yIHVzZXIgYXV0aG9yaXphdGlvbiwgYW5kIHRoZW5cbiAqIGV4ZWN1dGUgdGhlIGdpdmVuIGNhbGxiYWNrIHdpdGggdGhlIGF1dGhvcml6ZWQgT0F1dGgyIGNsaWVudC5cbiAqIEBwYXJhbSB7Z29vZ2xlLmF1dGguT0F1dGgyfSBvQXV0aDJDbGllbnQgVGhlIE9BdXRoMiBjbGllbnQgdG8gZ2V0IHRva2VuIGZvci5cbiAqIEBwYXJhbSB7Z2V0RXZlbnRzQ2FsbGJhY2t9IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBmb3IgdGhlIGF1dGhvcml6ZWQgY2xpZW50LlxuICovXG4vLyBmdW5jdGlvbiBnZXRBY2Nlc3NUb2tlbihvQXV0aDJDbGllbnQsIGNhbGxiYWNrKSB7XG4vLyAgICAgY29uc3QgYXV0aFVybCA9IG9BdXRoMkNsaWVudC5nZW5lcmF0ZUF1dGhVcmwoe1xuLy8gICAgICAgICBhY2Nlc3NfdHlwZTogJ29mZmxpbmUnLFxuLy8gICAgICAgICBzY29wZTogU0NPUEVTLFxuLy8gICAgIH0pO1xuLy8gICAgIGNvbnNvbGUubG9nKCdBdXRob3JpemUgdGhpcyBhcHAgYnkgdmlzaXRpbmcgdGhpcyB1cmw6JywgYXV0aFVybCk7XG4vLyAgICAgY29uc3QgcmwgPSByZWFkbGluZS5jcmVhdGVJbnRlcmZhY2Uoe1xuLy8gICAgICAgICBpbnB1dDogcHJvY2Vzcy5zdGRpbixcbi8vICAgICAgICAgb3V0cHV0OiBwcm9jZXNzLnN0ZG91dCxcbi8vICAgICB9KTtcbi8vICAgICBybC5xdWVzdGlvbignRW50ZXIgdGhlIGNvZGUgZnJvbSB0aGF0IHBhZ2UgaGVyZTogJywgKGNvZGUpID0+IHtcbi8vICAgICAgICAgcmwuY2xvc2UoKTtcbi8vICAgICAgICAgb0F1dGgyQ2xpZW50LmdldFRva2VuKGNvZGUsIChlcnIsIHRva2VuKSA9PiB7XG4vLyAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY29uc29sZS5lcnJvcignRXJyb3IgcmV0cmlldmluZyBhY2Nlc3MgdG9rZW4nLCBlcnIpO1xuLy8gICAgICAgICAgICAgb0F1dGgyQ2xpZW50LnNldENyZWRlbnRpYWxzKHRva2VuKTtcbi8vICAgICAgICAgICAgIC8vIFN0b3JlIHRoZSB0b2tlbiB0byBkaXNrIGZvciBsYXRlciBwcm9ncmFtIGV4ZWN1dGlvbnNcbi8vICAgICAgICAgICAgIGZzLndyaXRlRmlsZShgJHtfX2Rpcm5hbWV9L1RPS0VOX1BBVEhgLCBKU09OLnN0cmluZ2lmeSh0b2tlbiksIChlcnIpID0+IHtcbi8vICAgICAgICAgICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmVycm9yKGVycik7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Rva2VuIHN0b3JlZCB0bycsIFRPS0VOX1BBVEgpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICBjYWxsYmFjayhvQXV0aDJDbGllbnQpO1xuLy8gICAgICAgICB9KTtcbi8vICAgICB9KTtcbi8vIH1cblxuXG5leHBvcnQge2dldEdvb2dsZUNhbGVuZGFyRXZlbnRzfTtcbiJdfQ==