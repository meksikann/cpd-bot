import {logInfo, logError} from "../utils/logger";
import {readFileSync, writeFileSync} from "../utils/fileSys";

const fs = require('fs');

const path = require('path');
const readline = require('readline');
const {google} = require('googleapis');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';
const currentPath = path.dirname(__filename);

async function getGoogleCalendarEvents(calendarId, startTime, endTime) {
    logInfo('In googleCalendarApiHandler: get all events');

    let content = process.env.google_creds;

    // Authorize a client with credentials, then call the Google Calendar API.
    const oAuth2Client = await authorize(JSON.parse(content));
    const events = await listEvents(oAuth2Client, calendarId, startTime, endTime);

    return events;
}

async function addGoogleCalendarEvent(data) {
    let res = {
        event: null
    };

    let content = process.env.google_creds;
    // Authorize a client with credentials, then call the Google Calendar API.
    const oAuth2Client = await authorize(JSON.parse(content));

    res.event = await addEvent(oAuth2Client, data.calendarId, data.event);

    return res
}

function addEvent(auth, calendarId, event) {
    const calendar = google.calendar({version: 'v3'});

    return new Promise((resolve, reject) => {
        calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event,
        }, function (err, ev) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                reject();
            } else {
                resolve(ev);
            }
        });

    })
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
    let oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    let token;
    try {
        token = process.env.google_token;
        oAuth2Client.setCredentials(JSON.parse(token));
        return oAuth2Client;
    } catch (e) {
        console.error(e);
        return oAuth2Client;
    }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client) {
    return new Promise((resolve, reject) => {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, async (err, token) => {
                if (err) reject('Error retrieving access token', err);
                // Store the token to disk for later program executions
                let res = await writeFileSync(`${currentPath}/../creds/${TOKEN_PATH}`, JSON.stringify(token));

                resolve(token);
            });
        });
    })
}


export {getGoogleCalendarEvents, addGoogleCalendarEvent};
