let keyMirror = require('keymirror');

// actionIntents to do some action
const actionIntents = {
    'help': null,
    'action_listen': null,
    'action_create_event': null,
    'action_remove_event': null,
    'action_update_event': null
};

export default keyMirror(actionIntents);
