let keyMirror = require('keymirror');

// actionIntents to do some action
const actionIntents = {
    'action_listen': null,
    'action_create_event': null,
    'action_remove_event': null,
    'action_update_event': null,
    'action_show_my_events': null,
    'action_help': null,
    'action_check_room_available': null,
    'action_check_room_exists': null,
    'action_get_room_free_slots': null,
    'action_get_new_slots': null,
    'book_room': null,
    'action_check_auth_valid': null,
    'action_reset_auth_valid_slot': null,
    'action_check_office_location': null,
    'action_save_office_location': null
};

export default keyMirror(actionIntents);
