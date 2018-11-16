## Generated Story 3761683341241496844
* book_room
    - action_get_new_slots
    - action_check_auth_valid
    - slot{"auth_valid": true}
    - utter_user_authorized
    - action_reset_auth_valid_slot
    - slot{"auth_valid": false}
    - action_check_office_location
    - slot{"office_location": "vinnitsia"}
    - utter_ask_room_name
* inform{"room_name": "factory"}
    - slot{"room_name": "factory"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - utter_ask_time
* inform{"duration": "5", "time": "2018-11-16T17:17:05.000+02:00"}
    - slot{"duration": "5"}
    - slot{"time": "2018-11-16T17:17:05.000+02:00"}
    - action_get_new_slots
    - utter_on_it
    - action_check_room_available
    - slot{"is_room_available": true}
    - utter_room_is_free
    - utter_ask_event_name
* inform
    - action_extract_free_text_event_name
    - slot{"event_name": "new rass verstion available"}
    - utter_confirm_booking
* affirm
    - action_check_room_available
    - slot{"is_room_available": true}
    - action_book_room
    - slot{"success_booking": true}
    - slot{"event_name": null}
    - slot{"duration": null}
    - slot{"normalized_duration": null}
    - slot{"formatted_duration": null}
    - utter_room_booked
* affirm
    - utter_responce_got_it

