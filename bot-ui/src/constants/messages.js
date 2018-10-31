let messages = {

    /**************************************************************************
     ******************************* bot messages ******************************
     **************************************************************************/
    heroCard: {
        title: `Hello my friend. I'm your bot.`,
        subtitle: 'Your google-calendar bot — wherever your are talking',
        text: 'I am ready to help 24h/day  365/year. I can manage events in your google calendar, just ask me what you want.',
        buttonLabel: 'See manual'
    },
    bot_response: {
        /* ************************* rasa-core utter messages *********************************************************/
        utter_thank: 'glad to help you :). Ping me if you need something I can help with.',
        utter_bye: `Bye bye my friend...Don't hesitate to ping me if U need something.`,
        utter_greet: 'Hey :)',
        utter_how_can_help: 'How can I help?',
        utter_on_it: "I'm on it.",
        utter_ask_event_name: `What's event name?`,
        utter_event_saved: 'Event saved',
        utter_ask_room_name: 'tell me room name which is interesting for you?',
        utter_room_is_free: 'This room is free',
        utter_room_is_busy: 'This room is busy',
        utter_fallback: `sorry, I don't get your point dude ..Try to say same stuff using other sentence.:)`,
        utter_default: `sorry, I don't get your point dude ..Try to say same stuff using other sentence.:)`,
        utter_room_not_exists: 'the room name which you told me not exists.',
        utter_sure: `yeah pal, I'm sure`,
        utter_show_free_slots: 'todo -Room free time* make bot respond with some usefull info for user',
        utter_action_not_succeed: 'Hm...last action not succeeded. Would you please try again now.',
        utter_responce_got_it: 'Great.',
        utter_responce_who_are_you: 'Well....mmmm.... At the moment I am *chat-bot* called to help you with some conference-' +
            'room activities. But in future I am sure I will be able to manage some more stuff..And you know..maybe I could even have' +
            'some voice interface. Who knows!? :)',
        utter_responce_how_are_you: `I'm fine. Thanks:) Learning new stuff every day. And you?`,
        utter_user_not_authorized:`O-o-o-p-s! Can't make the action. I need to know you'r profile details, like *location, name and email*.`,
        utter_user_authorized: 'You authorized, so I can make action you asked for.',
        utter_provide_office_location: 'Hm... Need to get you office_location. Please choose the right one.',
        utter_location_saved: `Great! I've remembered your location :). As would Robocop say: *"Thank you for your cooperation"*  ;)`,
        utter_ready_to_proceed: 'Good! I am ready to go on...',

        /* ************************* custom ***************************************************************************/
        defaultmessage: 'default dialog goes here...Man!!....It means that you or bot screwed up conversation...:)',
        greeting: 'Hey, how can I help you?',
        noFreeSpace: 'No free space in next 3 hours',
        calendarIsEmpty: 'Calendar is empty'
    },
    getHelpMessage: function (url) {
        let message = `
         Ok. So first of all remember - I'm just in learning stage, and do not know loads of stuff.
         Our CPD team working on my skills.
         For now on I can give you information regarding conference rooms(Main conference room and small one) - if its available at time you need.
         I am sure - late I will be able even book some time for you etc..
         Also CPD guys working on [manual doc](${url}) ...or not..not really sure about it, better ask them;)
         Hope in future we'll have a nice talk:)`;

        return message;
    },
};


export {messages};
