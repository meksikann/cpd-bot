/**************************************************************************
 ******************************* bot messages ******************************
 **************************************************************************/
let getBotUtterance = function (data) {
    let roomName = data.roomName;
    let url = data.url;
    let time = data.time;
    let formattedDuration = data.formatted_duration;
    let userName = data.userName;
    let template = data.template;

    let botResponses = {
        /* ************************* rasa-core utter messages *********************************************************/
        utter_thank: 'glad to help you dude:). Ping me if you need something I can help with.',
        utter_bye: `Bye bye my friend...Don't hesitate to ping me if U need something.`,
        utter_greet: 'Yo :)',
        utter_how_can_help: `What can I help you with ${userName}?`,
        utter_on_it: `I'm on it.${userName}`,
        utter_ask_event_name: `How should I name the booked event?`,
        utter_event_saved: 'Event saved',
        utter_ask_room_name: `${userName} tell me *room name* which is interesting for you?`,
        utter_room_is_free: 'This room is free',
        utter_room_is_busy: 'This room is busy',
        utter_fallback: `sorry, I don't get your point dude ..Try to say same stuff using other sentence.:)`,
        utter_default: `sorry, I don't get your point dude ..Try to say same stuff using other sentence.:)`,
        utter_room_not_exists: 'the room name which you told me not exists.',
        utter_sure: `yeah pal, I'm sure ${userName}`,
        utter_show_free_slots: '',
        utter_action_not_succeed: 'Hm...last action not succeeded. Would you please try again now.',
        utter_responce_got_it: 'Great.',
        utter_responce_who_are_you: 'Well... At the moment I am *chat-bot* called to help you with some conference-' +
            'room activities. But in future I am sure I will be able to manage some more stuff..And you know..maybe I could even have' +
            'some voice interface. Who knows!? :)',
        utter_responce_how_are_you: `I'm fine. Thanks:) Learning new stuff every day. And you?`,
        utter_user_not_authorized: `Darn! Can't make the action. Need to get few details about your profile. 
        Don't you mind for few quick questions?`,
        utter_user_authorized: `You authorized ${userName}, so I can make action you asked for.`,
        utter_provide_office_location: 'Hm... Need to get you *office_location*. Please choose the right one.',
        utter_location_saved: `Great! I've remembered your location :). As would Robocop say: *"Thank you for your cooperation"*  ;)`,
        utter_ready_to_proceed: 'Good! I am ready to go on...',
        utter_ask_email: `Tell me your *email*, please.`,
        utter_ask_user_name: `And you'r *user name*? (start name with capitalized letter  ex. Alex)`,
        utter_ask_time: "At what time?",
        utter_ask_duration: "For how long should I book it?",
        utter_room_booked: `Done ${userName},I have booked room for you.`,
        utter_room_not_booked: "Failed to book room",
        utter_no_problem: "Sure. No problem, my friend.",
        utter_no_free_space: 'There is no free space',
        utter_confirm_booking: `So ${userName},I will book *${roomName}* at ${time} for next *${formattedDuration}*. _Correct_ ?`,
        utter_help: `
        Ok ${userName}. So first of all remember - I'm just in learning stage, and do not know loads of stuff. Our CPD team working on my skills.
For now on I can give you information regarding conference rooms (*FACTORY* room and *SPACE* room) - if its available at time you need.

Here are few examples you can start of:
- _Tell me if Factory is free tomorrow at 2pm_.
- _I want to book Space at 11am for 2 hours_.
- _Thanks_
- _Bye_
- _When big conference room is free?_
- _How are you?_
- _Who are you?_

Also CPD guys working on *Manual* (${url}).
If you have any issues, please ping dev-team to _serhii.skoromets@eliftech.com_
Hope in future we'll have a nice talk:)`,

        /* ************************* custom ***************************************************************************/
        defaultmessage: 'default dialog goes here...Man!!....It means that you or bot screwed up conversation...:)',
        greeting: 'Hey, how can I help you?',
        noFreeSpace: 'No free space in next 3 hours',
        calendarIsEmpty: 'Calendar is empty'
    };
    /* ******************************** end ***************************************************************************/

    return botResponses[template];

};


export {getBotUtterance};
