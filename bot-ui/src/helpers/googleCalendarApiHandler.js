import {logInfo, logError} from "../utils/logger";
import {readFileSync} from "../utils/fileSys";
import config from "../config";

const path = require('path');
const readline = require('readline');
const {google} = require('googleapis');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';
const currentPath = path.dirname(__filename);

async function getGoogleCalendarEvents(calendarId, startTime, endTime) {
    logInfo('In googleCalendarApiHandler: get all events');

    let content = await readFileSync(`${currentPath}/../creds/credentials.json`);
    console.log(content);
    // Authorize a client with credentials, then call the Google Calendar API.
    const oAuth2Client = await authorize(JSON.parse(content));
    const events = await listEvents(oAuth2Client, calendarId, startTime, endTime);

    return events;
}

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

function createGoogleCalendarEvent() {
    logInfo('In googleCalendarApiHandler: create vent');
}


/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth, calendarId, startTime, endTime) {
    const calendar = google.calendar({version: 'v3', auth});

    return new Promise((resolve, reject) => {
        calendar.events.list({
            calendarId: calendarId,
            timeMin: startTime || new Date().toISOString(),
            timeMax: endTime,
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        }, (err, res) => {
            if (err) {
                reject('The API returned an error: ' + err);
                return;
            }

            resolve(res.data.items);
        })
    })
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    const token = await readFileSync(`${currentPath}/../creds/${TOKEN_PATH}`);
    oAuth2Client.setCredentials(JSON.parse(token));

    return oAuth2Client;
}

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


export {getGoogleCalendarEvents};
