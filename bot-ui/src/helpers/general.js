import {logError, logInfo} from "../utils/logger";
import {getUserPermissions, updateUserProfileData} from './database-queries';
import {getUserSlackData} from '../utils/httpRequests';
import {addGoogleCalendarEvent} from './googleCalendarApiHandler';
import config from "../config";
import moment from 'moment';
import {each, find} from 'lodash';


const user = 'user';

function getDateWithDurationISOString(time, duration, unit, isAdd) {
    if (isAdd) {
        return moment(time).add(duration, unit).format();
    }

    return moment(time).subtract(duration, unit).format();
}

//choose which calendar ID user wants to use.
function getCalendarId(roomName) {
    let calendarsIds = process.env.NODE_ENV == 'production' ? config.productionCalendarIds :
        config.developmentCalendarIds;

    return calendarsIds[roomName];
}

function aggregateCalendarIds(roomName) {
    let calendarsIds = process.env.NODE_ENV == 'production' ? config.productionCalendarIds :
        config.developmentCalendarIds;
    let items = [];

    //if room name defined find aggregate data for specified room, else aggregate data for all existing rooms;
    if (roomName) {
        const id = getCalendarId(roomName);
        if (id) {
            items.push({
                "id": id,
                "name": roomName
            })
        }

        return items;
    }

    for (const [key, value] of Object.entries(calendarsIds)) {
        logInfo(`generated freebusy* data for ${key} calendar `);
        items.push({
            "id": value,
            "name": key
        })
    }

    return items;
}

//note: config.minDurationAvailableMin is minimum acceptable time range
function getTimeRangeFreeSlots(start, end, events) {
    let freeSlots = [];
    let startTime = start;
    let endTime = end;

    events.forEach((event) => {
        let diffMin = moment(event.start.dateTime).diff(startTime, 'minutes');

        if (diffMin >= config.minDurationAvailableMin) {
            freeSlots.push(
                {
                    start: startTime,
                    end: event.start.dateTime
                }
            )
        }

        startTime = event.end.dateTime;
    });

    //find last free time range
    let lastDiffMin = moment(endTime).diff(startTime, 'minutes');

    if (lastDiffMin >= config.minDurationAvailableMin) {
        freeSlots.push(
            {
                start: startTime,
                end: endTime
            }
        )
    }

    return freeSlots;
}

function getDate(string) {
    if (string) {
        return moment(string).format('DD-MM-YYYY');
    }
    return moment().format('DD-MM-YYYY');
}

function getTime(string) {
    if (string) {
        return moment(string).format('HH:mm');
    }
    return moment().format('HH:mm');
}

function getTimeStamp() {
    return moment().format('DD-MM-YYYY HH:mm:ss');
}

// if asked time passed allready  = set time now.
function getQueriedValidTime(time) {
    if (time && (moment(time) > moment())) {
        return time;
    }

    logInfo('Passed time requested');
    return new Date().toISOString();
}

function getNormalizedDuration(data) {
    const durationName = 'duration';
    const extractorName = 'ner_duckling_http';
    let durationData = {};

    logInfo('getting duration entity from array: ');

    // get duration data normalized in seconds
    each(data.entities, ent => {
        if (ent.entity == durationName && ent.extractor == extractorName) {
            durationData.value = ent.additional_info.normalized.value;
            durationData.unit = ent.additional_info.normalized.unit + 's'; // for moment e.g. 'second' into 'seconds'
        }
    });

    return durationData
}

function geterateQueryData(nextActionData) {
    return {
        roomName: nextActionData.slots.room_name,
        time: getQueriedValidTime(nextActionData.slots.time),
        duration: nextActionData.slots.duration ? getNormalizedDuration(nextActionData) : {},
        normalized_duration: nextActionData.slots.normalized_duration
    };
}

function getNewsSlotsFromUtterance(data) {
    let newSlots = [];

    //if duration mentioned in utternace but not set slots value
    if (data.slots.duration && !data.slots.normalized_duration) {
        let durationData = getNormalizedDuration(data);

        if (durationData.value && durationData.unit) {
            newSlots.push(
                {"event": "slot", "name": "normalized_duration", "value": durationData.value}
            )

            // add human normalized dration
            newSlots.push(
                {"event": "slot", "name": "formatted_duration", "value": getFormattedDuration(durationData.value)}
            )
        }
    }

    return newSlots;
}

// get formatted duration text from seconds to user friendly format
function getFormattedDuration(value) {
    let seconds = value ? value : config.minDurationAvailableMin * 60;

    return moment.duration(seconds, "seconds").humanize()
}

function getHumanizedTime(time) {
    console.log(time);
    return moment(time).format("h:mm a, dddd, MMM Do YYYY");
}

async function checkUserAuth(data) {
    let user;

    user = await getUserPermissions(data.senderId);
    // if permission has any office location and email  and name, set auth slot to true
    if (user && user.email && user.name) {
        logInfo('retrieved user data from Db');
        return [
            {"event": "slot", "name": "auth_valid", "value": true}
        ]
    }

    // if user uses Slack channel, try to retrieve info from channel
    if (data.channel == config.slackChannel) {
        let resp = await getUserSlackData(data.senderId);

        if (!resp.ok) {
            logError('Error while getting data from slack app');
            logError(resp.error);
            return [{"event": "slot", "name": "auth_valid", "value": false}]
        }

        user = resp.profile;

        // if data received - save to DB and send slost auth true
        if (user && user.email && user.real_name) {
            logInfo('retrieved user data from slack');

            await updateUserProfileData(data.senderId, user.email, user.real_name);

            return [
                {"event": "slot", "name": "auth_valid", "value": true}
            ]
        }
    }


    // if there is no any data about user - send auth slot as false
    return [{"event": "slot", "name": "auth_valid", "value": false}]
}

function resetAuthSlot() {
    return [{"event": "slot", "name": "auth_valid", "value": false}]
}

async function getUserOfficeLocation(data) {
    console.log('check office location in db---------------->>>>>');
    let user = await getUserPermissions(data.senderId);

    if (user && user.office_location) {
        return [{"event": "slot", "name": "office_location", "value": user.office_location}]
    }

    return []
}

async function saveUserOfficeLocation(data) {
    logInfo('saving office location into db');

    return await updateUserProfileData(data.senderId, null, null, data.slots.office_location);
}

async function saveUserEmail(data) {
    let email = getEntityValue(data.entities, 'email');

    if (email) {
        await updateUserProfileData(data.senderId, email, null, null);

        return [{"event": "slot", "name": "email", "value": email}]
    }

    return [];
}

async function saveUserName(data) {

    let name = getEntityValue(data.entities, 'user_name');

    if (name) {
        await updateUserProfileData(data.senderId, null, name, null);

        return [{"event": "slot", "name": "user_name", "value": name}]
    }

    return [];
}

function getEntityValue(entities, entityName) {
    let entity = find(entities, ent => {
        return ent.entity === entityName
    });

    return entity.value || null;
}

async function bookRoom(data) {
    console.log(data);

    let user = await getUserPermissions(data.senderId);
    let calendarId = getCalendarId(data.slots.room_name);
    let time = data.slots.time || getQueriedValidTime();
    let event = generateEvent(user.email, time,
        getDateWithDurationISOString(time, data.slots.normalized_duration || config.minDurationAvailableMin * 60,
            'seconds', true), data.slots.event_name);
    let req = {
        event,
        calendarId
    };
    logInfo('Event to create: ', req);
    let res = await addGoogleCalendarEvent(req);

    if (res.event) {
        return [
            {"event": "slot", "name": "success_booking", "value": true},
            {"event": "slot", "name": "event_name", "value": null},
            {"event": "slot", "name": "duration", "value":null},
            {"event": "slot", "name": "normalized_duration", "value":null},
            {"event": "slot", "name": "formatted_duration", "value":null}
            ]
    }

    return [{"event": "slot", "name": "success_booking", "value": false}]
}

function generateEvent(email, startTime, endTime, eventName) {
    let event = {
        'summary': eventName,
        'location': '',
        'description': 'this is test cpd-bot description (later on bot will be able to ask you for the description)',
        'start': {
            'dateTime': startTime,
            'timeZone': config.timeZone,
        },
        'end': {
            'dateTime': endTime,
            'timeZone': config.timeZone,
        },
        'recurrence': [],
        'attendees': [
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
    };

    return event;
}

function extractFreeTextAsEventName(data) {
    if(data.slots.event_name) {
        return []
    }
    let name = data.latest_message;

    return [{"event": "slot", "name": "event_name", "value": name}]
}
let generalHelper = {
    getQueriedValidTime, getDateWithDurationISOString, getCalendarId, aggregateCalendarIds, getTimeRangeFreeSlots,
    getDate, getTime, getTimeStamp, geterateQueryData, getNewsSlotsFromUtterance, checkUserAuth, resetAuthSlot,
    getUserOfficeLocation, saveUserOfficeLocation, saveUserEmail, saveUserName, getFormattedDuration, bookRoom,
    getHumanizedTime, extractFreeTextAsEventName
};
export {generalHelper}
