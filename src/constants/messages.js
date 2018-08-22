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
        utter_bye: 'bye',
        utter_greet: 'Hey, how are you today?',
        /* ************************* custom ***************************************************************************/
        defaultmessage: 'default dialog goes here...Man!!....It means that you or bot screwed up conversation...:)',
        greeting: 'Hey, how can I help you?',
    }
};


export {messages};
