let keyMirror = require('keymirror');

const intents = {
    'utter_greet': null,
    'utter_appreciation': null,
    'utter_farewell': null,
    'help': null,
};

export default keyMirror(intents);
