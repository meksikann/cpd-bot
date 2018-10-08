'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var messages = {

    /**************************************************************************
     ******************************* bot messages ******************************
     **************************************************************************/
    heroCard: {
        title: 'Hello my friend. I\'m your bot.',
        subtitle: 'Your google-calendar bot — wherever your are talking',
        text: 'I am ready to help 24h/day  365/year. I can manage events in your google calendar, just ask me what you want.',
        buttonLabel: 'See manual'
    },
    bot_response: {
        /* ************************* rasa-core utter messages *********************************************************/
        utter_thank: 'glad to help you :)',
        utter_bye: 'Bye bye my friend...Don\'t hesitate to ping me if U need something.',
        utter_greet: 'Hey :)',
        utter_how_can_help: 'How can I help?',
        utter_on_it: "I'm on it.",
        utter_ask_event_name: 'What\'s event name?',
        utter_event_saved: 'Event saved',
        utter_ask_room_name: 'tell me room name which is interesting for you?',
        utter_room_is_free: 'room is free',
        utter_room_is_busy: 'room is busy',
        utter_fallback: 'sorry, I don\'t get your point dude ..Try to say same stuff using other sentence.:)',
        utter_default: 'sorry, I don\'t get your point dude ..Try to say same stuff using other sentence.:)',
        utter_room_not_exists: 'the room name which you told me not exists.',
        utter_sure: 'yeah pal, I\'m sure',
        utter_show_free_slots: 'todo -Room free time* make bot respond with some usefull info for user',
        utter_action_not_succeed: 'Hm...last action not succeeded. Would you please try again now.',
        /* ************************* custom ***************************************************************************/
        defaultmessage: 'default dialog goes here...Man!!....It means that you or bot screwed up conversation...:)',
        greeting: 'Hey, how can I help you?',
        noFreeSpace: 'No free space in next 3 hours',
        calendarIsEmpty: 'Calendar is empty'
    },
    getHelpMessage: function getHelpMessage(url) {
        var message = 'Ok. So first of all remember - I\'m just in learning stage, and do not know loads of stuff.\n         Our CPD team working on my skills.\n         For now on I can give you information regarding conference rooms(Main conference room and small one) - if its available at time you need.\n         I am sure - late I will be able even book some time for you etc..\n         Also CPD guys working on [manual doc](' + url + ') ...or not..not really sure about it, better ask them;)\n         Hope in future we\'ll have a nice talk:)';

        return message;
    }
};

exports.messages = messages;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdGFudHMvbWVzc2FnZXMuanMiXSwibmFtZXMiOlsibWVzc2FnZXMiLCJoZXJvQ2FyZCIsInRpdGxlIiwic3VidGl0bGUiLCJ0ZXh0IiwiYnV0dG9uTGFiZWwiLCJib3RfcmVzcG9uc2UiLCJ1dHRlcl90aGFuayIsInV0dGVyX2J5ZSIsInV0dGVyX2dyZWV0IiwidXR0ZXJfaG93X2Nhbl9oZWxwIiwidXR0ZXJfb25faXQiLCJ1dHRlcl9hc2tfZXZlbnRfbmFtZSIsInV0dGVyX2V2ZW50X3NhdmVkIiwidXR0ZXJfYXNrX3Jvb21fbmFtZSIsInV0dGVyX3Jvb21faXNfZnJlZSIsInV0dGVyX3Jvb21faXNfYnVzeSIsInV0dGVyX2ZhbGxiYWNrIiwidXR0ZXJfZGVmYXVsdCIsInV0dGVyX3Jvb21fbm90X2V4aXN0cyIsInV0dGVyX3N1cmUiLCJ1dHRlcl9zaG93X2ZyZWVfc2xvdHMiLCJ1dHRlcl9hY3Rpb25fbm90X3N1Y2NlZWQiLCJkZWZhdWx0bWVzc2FnZSIsImdyZWV0aW5nIiwibm9GcmVlU3BhY2UiLCJjYWxlbmRhcklzRW1wdHkiLCJnZXRIZWxwTWVzc2FnZSIsInVybCIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsV0FBVzs7QUFFWDs7O0FBR0FDLGNBQVU7QUFDTkMsZ0RBRE07QUFFTkMsa0JBQVUsc0RBRko7QUFHTkMsY0FBTSwrR0FIQTtBQUlOQyxxQkFBYTtBQUpQLEtBTEM7QUFXWEMsa0JBQWM7QUFDVjtBQUNBQyxxQkFBYSxxQkFGSDtBQUdWQyx3RkFIVTtBQUlWQyxxQkFBYSxRQUpIO0FBS1ZDLDRCQUFvQixpQkFMVjtBQU1WQyxxQkFBYSxZQU5IO0FBT1ZDLG1EQVBVO0FBUVZDLDJCQUFtQixhQVJUO0FBU1ZDLDZCQUFxQixpREFUWDtBQVVWQyw0QkFBb0IsY0FWVjtBQVdWQyw0QkFBb0IsY0FYVjtBQVlWQyw2R0FaVTtBQWFWQyw0R0FiVTtBQWNWQywrQkFBdUIsNkNBZGI7QUFlVkMseUNBZlU7QUFnQlZDLCtCQUF1Qix3RUFoQmI7QUFpQlZDLGtDQUEwQixpRUFqQmhCO0FBa0JWO0FBQ0FDLHdCQUFnQiwyRkFuQk47QUFvQlZDLGtCQUFVLDBCQXBCQTtBQXFCVkMscUJBQWEsK0JBckJIO0FBc0JWQyx5QkFBaUI7QUF0QlAsS0FYSDtBQW1DWEMsb0JBQWdCLHdCQUFVQyxHQUFWLEVBQWU7QUFDM0IsWUFBSUMsd2FBSXFDRCxHQUpyQyxnSEFBSjs7QUFPQSxlQUFPQyxPQUFQO0FBQ0g7QUE1Q1UsQ0FBZjs7UUFnRFE3QixRLEdBQUFBLFEiLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgbWVzc2FnZXMgPSB7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBib3QgbWVzc2FnZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGhlcm9DYXJkOiB7XG4gICAgICAgIHRpdGxlOiBgSGVsbG8gbXkgZnJpZW5kLiBJJ20geW91ciBib3QuYCxcbiAgICAgICAgc3VidGl0bGU6ICdZb3VyIGdvb2dsZS1jYWxlbmRhciBib3Qg4oCUIHdoZXJldmVyIHlvdXIgYXJlIHRhbGtpbmcnLFxuICAgICAgICB0ZXh0OiAnSSBhbSByZWFkeSB0byBoZWxwIDI0aC9kYXkgIDM2NS95ZWFyLiBJIGNhbiBtYW5hZ2UgZXZlbnRzIGluIHlvdXIgZ29vZ2xlIGNhbGVuZGFyLCBqdXN0IGFzayBtZSB3aGF0IHlvdSB3YW50LicsXG4gICAgICAgIGJ1dHRvbkxhYmVsOiAnU2VlIG1hbnVhbCdcbiAgICB9LFxuICAgIGJvdF9yZXNwb25zZToge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqIHJhc2EtY29yZSB1dHRlciBtZXNzYWdlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIHV0dGVyX3RoYW5rOiAnZ2xhZCB0byBoZWxwIHlvdSA6KScsXG4gICAgICAgIHV0dGVyX2J5ZTogYEJ5ZSBieWUgbXkgZnJpZW5kLi4uRG9uJ3QgaGVzaXRhdGUgdG8gcGluZyBtZSBpZiBVIG5lZWQgc29tZXRoaW5nLmAsXG4gICAgICAgIHV0dGVyX2dyZWV0OiAnSGV5IDopJyxcbiAgICAgICAgdXR0ZXJfaG93X2Nhbl9oZWxwOiAnSG93IGNhbiBJIGhlbHA/JyxcbiAgICAgICAgdXR0ZXJfb25faXQ6IFwiSSdtIG9uIGl0LlwiLFxuICAgICAgICB1dHRlcl9hc2tfZXZlbnRfbmFtZTogYFdoYXQncyBldmVudCBuYW1lP2AsXG4gICAgICAgIHV0dGVyX2V2ZW50X3NhdmVkOiAnRXZlbnQgc2F2ZWQnLFxuICAgICAgICB1dHRlcl9hc2tfcm9vbV9uYW1lOiAndGVsbCBtZSByb29tIG5hbWUgd2hpY2ggaXMgaW50ZXJlc3RpbmcgZm9yIHlvdT8nLFxuICAgICAgICB1dHRlcl9yb29tX2lzX2ZyZWU6ICdyb29tIGlzIGZyZWUnLFxuICAgICAgICB1dHRlcl9yb29tX2lzX2J1c3k6ICdyb29tIGlzIGJ1c3knLFxuICAgICAgICB1dHRlcl9mYWxsYmFjazogYHNvcnJ5LCBJIGRvbid0IGdldCB5b3VyIHBvaW50IGR1ZGUgLi5UcnkgdG8gc2F5IHNhbWUgc3R1ZmYgdXNpbmcgb3RoZXIgc2VudGVuY2UuOilgLFxuICAgICAgICB1dHRlcl9kZWZhdWx0OiBgc29ycnksIEkgZG9uJ3QgZ2V0IHlvdXIgcG9pbnQgZHVkZSAuLlRyeSB0byBzYXkgc2FtZSBzdHVmZiB1c2luZyBvdGhlciBzZW50ZW5jZS46KWAsXG4gICAgICAgIHV0dGVyX3Jvb21fbm90X2V4aXN0czogJ3RoZSByb29tIG5hbWUgd2hpY2ggeW91IHRvbGQgbWUgbm90IGV4aXN0cy4nLFxuICAgICAgICB1dHRlcl9zdXJlOiBgeWVhaCBwYWwsIEknbSBzdXJlYCxcbiAgICAgICAgdXR0ZXJfc2hvd19mcmVlX3Nsb3RzOiAndG9kbyAtUm9vbSBmcmVlIHRpbWUqIG1ha2UgYm90IHJlc3BvbmQgd2l0aCBzb21lIHVzZWZ1bGwgaW5mbyBmb3IgdXNlcicsXG4gICAgICAgIHV0dGVyX2FjdGlvbl9ub3Rfc3VjY2VlZDogJ0htLi4ubGFzdCBhY3Rpb24gbm90IHN1Y2NlZWRlZC4gV291bGQgeW91IHBsZWFzZSB0cnkgYWdhaW4gbm93LicsXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKiogY3VzdG9tICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgZGVmYXVsdG1lc3NhZ2U6ICdkZWZhdWx0IGRpYWxvZyBnb2VzIGhlcmUuLi5NYW4hIS4uLi5JdCBtZWFucyB0aGF0IHlvdSBvciBib3Qgc2NyZXdlZCB1cCBjb252ZXJzYXRpb24uLi46KScsXG4gICAgICAgIGdyZWV0aW5nOiAnSGV5LCBob3cgY2FuIEkgaGVscCB5b3U/JyxcbiAgICAgICAgbm9GcmVlU3BhY2U6ICdObyBmcmVlIHNwYWNlIGluIG5leHQgMyBob3VycycsXG4gICAgICAgIGNhbGVuZGFySXNFbXB0eTogJ0NhbGVuZGFyIGlzIGVtcHR5J1xuICAgIH0sXG4gICAgZ2V0SGVscE1lc3NhZ2U6IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBgT2suIFNvIGZpcnN0IG9mIGFsbCByZW1lbWJlciAtIEknbSBqdXN0IGluIGxlYXJuaW5nIHN0YWdlLCBhbmQgZG8gbm90IGtub3cgbG9hZHMgb2Ygc3R1ZmYuXG4gICAgICAgICBPdXIgQ1BEIHRlYW0gd29ya2luZyBvbiBteSBza2lsbHMuXG4gICAgICAgICBGb3Igbm93IG9uIEkgY2FuIGdpdmUgeW91IGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb25mZXJlbmNlIHJvb21zKE1haW4gY29uZmVyZW5jZSByb29tIGFuZCBzbWFsbCBvbmUpIC0gaWYgaXRzIGF2YWlsYWJsZSBhdCB0aW1lIHlvdSBuZWVkLlxuICAgICAgICAgSSBhbSBzdXJlIC0gbGF0ZSBJIHdpbGwgYmUgYWJsZSBldmVuIGJvb2sgc29tZSB0aW1lIGZvciB5b3UgZXRjLi5cbiAgICAgICAgIEFsc28gQ1BEIGd1eXMgd29ya2luZyBvbiBbbWFudWFsIGRvY10oJHt1cmx9KSAuLi5vciBub3QuLm5vdCByZWFsbHkgc3VyZSBhYm91dCBpdCwgYmV0dGVyIGFzayB0aGVtOylcbiAgICAgICAgIEhvcGUgaW4gZnV0dXJlIHdlJ2xsIGhhdmUgYSBuaWNlIHRhbGs6KWA7XG5cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSxcbn07XG5cblxuZXhwb3J0IHttZXNzYWdlc307XG4iXX0=