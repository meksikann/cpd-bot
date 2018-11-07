
## initial story 1 without email, user name, location
* book_room
    - action_check_auth_valid
    - slot{"auth_valid": false}
    - utter_user_not_authorized
* affirm
    - utter_ask_email
* inform{"email":"user@email.com"}
    - action_save_user_email
    - slot{"email": "user@email.com"}
    - utter_responce_got_it
    - utter_ask_user_name
* inform{"user_name":"Alex"}
    - action_save_user_name
    - slot{"user_name": "Sergio"}
    - action_check_office_location
    - slot{"office_location": null}
    - utter_provide_office_location
* inform{"office_location":"vinnitsia"}
    - action_save_office_location
    - utter_location_saved
    - utter_ready_to_proceed

## initial story 1 without email, user name, BUT with location
* book_room
    - action_check_auth_valid
    - slot{"auth_valid": false}
    - utter_user_not_authorized
* affirm
    - utter_ask_email
* inform{"email":"user@email.com"}
    - action_save_user_email
    - slot{"email": "user@email.com"}
    - utter_responce_got_it
    - utter_ask_user_name
* inform{"user_name":"Alex"}
    - action_save_user_name
    - slot{"user_name": "Sergio"}
    - action_check_office_location
    - slot{"office_location": "vinnitsia"}
    - utter_ready_to_proceed
    
    
## initial story 2
* greet
    - utter_greet
    - utter_how_can_help
* book_room
    - action_check_auth_valid
    - slot{"auth_valid": true}
    - utter_user_authorized
    - action_reset_auth_valid_slot
    - slot{"auth_valid": false}
    - action_check_office_location
    - slot{"office_location": null}
    - utter_provide_office_location
* inform{"office_location":"vinnitsia"}
    - action_save_office_location
    - utter_location_saved
    - utter_ready_to_proceed



## Generated Story -7490739042947398003
* greet
    - utter_how_can_help
* book_room{"duration": 2, "room_name": "factory", "time": "2018-11-02T15:00:00.000+02:00"}
    - slot{"duration": 2}
    - slot{"room_name": "factory"}
    - slot{"time": "2018-11-02T15:00:00.000+02:00"}
    - action_get_new_slots
    - slot{"normalized_duration": 7200}
    - slot{"formatted_duration": "2 hours"}
    - action_check_auth_valid
    - slot{"auth_valid": false}
    - utter_user_not_authorized
* affirm
    - utter_ask_email
* inform{ "email": "serhiy@mail.com"}
    - slot{"email": "serhiy@mail.com"}
    - slot{"user_name": "serhiy@mail.com"}
    - action_save_user_email
    - slot{"email": "serhiy@mail.com"}
    - utter_responce_got_it
    - utter_ask_user_name
* inform{"user_name": "serhiy"}
    - slot{"user_name": "serhiy"}
    - action_save_user_name
    - slot{"user_name": "serhiy"}
    - action_check_office_location
    - utter_provide_office_location
* inform{"office_location": "vinnitsia"}
    - slot{"office_location": "vinnitsia"}
    - action_save_office_location
    - utter_location_saved
    - utter_ready_to_proceed
    - utter_ask_event_name
* inform{"event_name": "Test bot meeting"}
    - slot{"event_name": "Test bot meeting"}
    - utter_confirm_booking
* affirm
    - action_check_room_available
    - slot{"is_room_available": true}
    - action_book_room
    - slot{"success_booking": true}
    - utter_room_booked
* affirm
    - utter_responce_got_it
* thank
    - utter_thank


## Generated Story -9184593259616674339
* book_room{"room_name": "factory"}
    - slot{"room_name": "factory"}
    - action_get_new_slots
    - action_check_auth_valid
    - slot{"auth_valid": true}
    - utter_user_authorized
    - action_reset_auth_valid_slot
    - slot{"auth_valid": false}
    - action_check_office_location
    - slot{"office_location": "vinnitsia"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - utter_ask_event_name
* inform{"event_name": "Test bot meeting"}
    - slot{"event_name": "Test bot meeting"}
    - utter_confirm_booking
* affirm
    - action_check_room_available
    - slot{"is_room_available": true}
    - action_book_room
    - slot{"success_booking": true}
    - utter_room_booked
* thank
    - utter_thank
* book_room{"room_name": "factory", "time": "2018-11-07T12:07:12.000+02:00"}
    - slot{"room_name": "factory"}
    - slot{"time": "2018-11-07T12:07:12.000+02:00"}
    - action_get_new_slots
    - action_check_auth_valid
    - slot{"auth_valid": true}
    - utter_user_authorized
    - action_reset_auth_valid_slot
    - slot{"auth_valid": false}
    - action_check_office_location
    - slot{"office_location": "vinnitsia"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - utter_ask_event_name
* inform{"event_name": "Second testing"}
    - slot{"event_name": "Second testing"}
    - utter_confirm_booking
* affirm
    - action_check_room_available
    - slot{"is_room_available": false}
    - utter_room_is_busy
* affirm
    - utter_responce_got_it
    
    action_extract_free_text_event_name

## BOOK ROOM And extract event_name as free text
* book_room{"room_name": "factory"}
    - slot{"room_name": "factory"}
    - action_get_new_slots
    - action_check_auth_valid
    - slot{"auth_valid": true}
    - utter_user_authorized
    - action_reset_auth_valid_slot
    - slot{"auth_valid": false}
    - action_check_office_location
    - slot{"office_location": "vinnitsia"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - utter_ask_event_name
* inform
    - action_extract_free_text_event_name
    - slot{"event_name": "Test bot meeting"}
    - utter_confirm_booking
* affirm
    - action_check_room_available
    - slot{"is_room_available": true}
    - action_book_room
    - slot{"success_booking": true}
    - utter_room_booked
