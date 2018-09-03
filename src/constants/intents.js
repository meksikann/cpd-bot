let keyMirror = require('keymirror');

// actionIntents to do some action
const actionIntents = {
    'action_listen': null,
    'action_create_event': null,
    'action_remove_event': null,
    'action_update_event': null,
    'action_show_my_events': null,
    'action_help': null
};

export default keyMirror(actionIntents);
