import {logInfo} from "../utils/logger";
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

//TODO: make googleCalendarApiHandler work with googleApi
const googleCalendarApiHandler = () => {
    // If modifying these scopes, delete token.json.
    const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
    const TOKEN_PATH = 'token.json';

    
    function getEvents() {
        logInfo('In googleCalendarApiHandler: get all events');
    }

    function createEvent() {
        logInfo('In googleCalendarApiHandler: create vent');
    }

    return {
        getEvents: getEvents,
        createEvent: createEvent
    }
};


export default googleCalendarApiHandler;
