import {logInfo} from "../utils/logger";
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {google} = require('googleapis');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';
const currentPath = path.dirname(__filename);

/*    *********available calendars ids**********/
const daysOffCalendarId = 'eliftech.com_92gsu525ed2rrfotqfcd23vnk4@group.calendar.google.com';
const conferanceRoomOffCalendarId = 'eliftech.com_opr4uacf9vnofoacil689vpbh8@group.calendar.google.com';
const myCalendarId = 'primary';

function getGoogleCalendarEvents() {
    logInfo('In googleCalendarApiHandler: get all events');

    //list daysOff
    return performAction(listEvents, daysOffCalendarId)
}

function createGoogleCalendarEvent() {
    logInfo('In googleCalendarApiHandler: create vent');
}

function performAction(performCallback, calendarId) {
    // Load client secrets from a local file.
    fs.readFile(`${currentPath}/../creds/credentials.json`, (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content),calendarId, performCallback);
    });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth, calendarId) {
    const calendar = google.calendar({version: 'v3', auth});

    calendar.events.list({
        calendarId: calendarId,
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
            console.log('Upcoming 10 events:');
            events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
            });
        } else {
            console.log('No upcoming events found.');
        }

        return events;
    });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, calendarId, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    fs.readFile(`${currentPath}/../creds/${TOKEN_PATH}`, (err, token) => {
        if (err) {
            return console.error(err);
        }
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client, calendarId);
    });
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
