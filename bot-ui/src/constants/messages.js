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
        utter_thank: 'glad to help you',
        utter_bye: `Bye bye my friend...Don't hesitate to ping me if U need something.`,
        utter_greet: 'Hey :)',
        utter_how_can_help: 'How can I help?',
        utter_on_it: "I'm on it.",
        utter_ask_event_name: `What's event name?`,
        utter_event_saved: 'Event saved',
        utter_ask_room_name: 'tell me room name which is interesting for you?',
        utter_room_is_free: 'room is free',
        utter_room_is_busy: 'room is busy',
        utter_fallback: `sorry, I don't get your point dude ..Try to say same stuff using other sentence.:)`,
        utter_room_not_exists: 'the room name which you told me not exists.',
        utter_sure: `yeah pal, I'm sure`,
        utter_show_free_slots: 'todo -Room free time* make bot respond with some usefull info for user',
        utter_action_not_succeed: 'Hm...last action not succeeded. Would you please try again now.',
        /* ************************* custom ***************************************************************************/
        defaultmessage: 'default dialog goes here...Man!!....It means that you or bot screwed up conversation...:)',
        greeting: 'Hey, how can I help you?',
        noFreeSpace: 'No free space in next 3 hours',
        calendarIsEmpty: 'Calendar is empty'
    }
};


export {messages};
