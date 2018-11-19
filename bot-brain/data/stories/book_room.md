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
    - action_reset_slots
* affirm
    - utter_responce_got_it
* thank
    - utter_thank


    
## Generated Story -7581435261927789756 book room and ask: time, duration, and event name
* greet
    - utter_how_can_help
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
* inform{"time": "2018-11-14T14:00:00.000+02:00"}
    - slot{"time": "2018-11-14T14:00:00.000+02:00"}
    - utter_ask_duration
* inform{"duration": 3}
    - slot{"duration": 3}
    - action_get_new_slots
    - slot{"normalized_duration": 10800}
    - slot{"formatted_duration": "3 hours"}
    - utter_on_it
    - action_check_room_available
    - slot{"is_room_available": true}
    - utter_room_is_free
    - utter_ask_event_name
* inform
    - action_extract_free_text_event_name
    - slot{"event_name": "Classwallet meeting"}
    - utter_confirm_booking
* affirm
    - action_check_room_available
    - slot{"is_room_available": true}
    - action_book_room
    - slot{"success_booking": true}
    - utter_room_booked
    - action_reset_slots
* got_it
    - utter_responce_got_it


## Generated Story 3156130285303646814 - ask duration
* book_room{"room_name": "factory", "time": "2018-11-13T18:05:42.000+02:00"}
    - slot{"room_name": "factory"}
    - slot{"time": "2018-11-13T18:05:42.000+02:00"}
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
    - utter_ask_duration
* inform{"duration": 20}
    - slot{"duration": 20}
    - action_get_new_slots
    - slot{"normalized_duration": 1200}
    - slot{"formatted_duration": "20 minutes"}
    - utter_on_it
    - action_check_room_available
    - slot{"is_room_available": true}
    - utter_room_is_free
    - utter_ask_event_name
* inform
    - action_extract_free_text_event_name
    - slot{"event_name": "CW meetup"}
    - utter_confirm_booking
* affirm
    - action_check_room_available
    - slot{"is_room_available": true}
    - action_book_room
    - slot{"success_booking": true}
    - utter_room_booked
    - action_reset_slots
* thank
    - utter_thank
    
## Generated Story 5716040513303116712 - when room busy at first time
* book_room{"room_name": "space"}
    - slot{"room_name": "space"}
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
    - utter_ask_time
* inform{"time": "2018-11-13T20:33:51.000+02:00"}
    - slot{"time": "2018-11-13T20:33:51.000+02:00"}
    - utter_ask_duration
* inform{"duration": 20}
    - slot{"duration": 20}
    - action_get_new_slots
    - slot{"normalized_duration": 1200}
    - slot{"formatted_duration": "20 minutes"}
    - utter_on_it
    - action_check_room_available
    - slot{"is_room_available": false}
    - utter_room_is_busy
* got_it
    - utter_responce_got_it
* get_room_free_slots
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_get_room_free_slots
    - slot{"rooms_free_slots": [{"room_name": "space", "room_id": "eliftech.com_os8ir07e7uqleh3jmid199q9l0@group.calendar.google.com", "free_slots": [{"start": "2018-11-13T21:23:20+02:00", "end": "2018-11-14T01:36:13+02:00"}]}]}
    - utter_show_free_slots
* book_room{"time": "2018-11-13T22:00:00.000+02:00"}
    - slot{"time": "2018-11-13T22:00:00.000+02:00"}
    - action_get_new_slots
    - action_check_auth_valid
    - slot{"auth_valid": true}
    - utter_ask_duration
* inform{"duration": 30}
    - slot{"duration": 30}
    - action_get_new_slots
    - slot{"normalized_duration": 21211}
    - slot{"formatted_duration": "30 mins"}
    - action_check_room_available
    - slot{"normalized_duration": 1800}
    - slot{"formatted_duration": "30 minutes"}
    - slot{"is_room_available": true}
    - utter_ask_event_name
* inform
    - action_extract_free_text_event_name
    - slot{"event_name": "cw testing"}
    - utter_confirm_booking
* affirm
    - action_book_room
    - slot{"success_booking": true}
    - utter_room_booked
    - action_reset_slots
* got_it
    - utter_responce_got_it

## Generated Story 7773498020848364585 - asked if room is free. It was busy. then book at fre time
* greet
    - utter_how_can_help
* check_room_available{"room_name": "space", "time": "2018-11-13T21:05:01.000+02:00"}
    - slot{"room_name": "space"}
    - slot{"time": "2018-11-13T21:05:01.000+02:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": false}
    - utter_room_is_busy
* get_room_free_slots
    - action_get_room_free_slots
    - slot{"rooms_free_slots": [{"room_name": "space", "room_id": "eliftech.com_os8ir07e7uqleh3jmid199q9l0@group.calendar.google.com", "free_slots": [{"start": "2018-11-13T21:23:20+02:00", "end": "2018-11-13T22:00:00+02:00"}, {"start": "2018-11-13T22:50:00+02:00", "end": "2018-11-14T02:05:51+02:00"}]}]}
    - utter_show_free_slots
* book_room{"time": "2018-11-13T22:50:00.000+02:00"}
    - slot{"time": "2018-11-13T22:50:00.000+02:00"}
    - action_check_auth_valid
    - slot{"auth_valid": true}
    - utter_user_authorized
    - action_reset_auth_valid_slot
    - slot{"auth_valid": false}
    - action_check_office_location
    - slot{"office_location": "vinnitsia"}
    - utter_ask_duration
* inform{"duration": 30}
    - slot{"duration": 30}
    - action_get_new_slots
    - slot{"normalized_duration": 1800}
    - slot{"formatted_duration": "30 minutes"}
    - utter_on_it
    - action_check_room_available
    - slot{"is_room_available": true}
    - utter_room_is_free
    - utter_ask_event_name
* inform
    - action_extract_free_text_event_name
    - slot{"event_name": "test LAST test"}
    - utter_confirm_booking
* affirm
    - action_check_room_available
    - slot{"is_room_available": true}
    - action_book_room
    - slot{"success_booking": true}
    - utter_room_booked
    - action_reset_slots
* thank
    - utter_thank
* bye
    - utter_bye


## Generated Story 6880213295462436773 - when first room name not exists. then provide real name
* book_room{"duration": 3, "time": "2018-11-14T14:00:00.000+02:00"}
    - slot{"duration": 3}
    - slot{"time": "2018-11-14T14:00:00.000+02:00"}
    - action_get_new_slots
    - slot{"normalized_duration": 10800}
    - slot{"formatted_duration": "3 hours"}
    - action_check_auth_valid
    - slot{"auth_valid": true}
    - utter_user_authorized
    - action_reset_auth_valid_slot
    - slot{"auth_valid": false}
    - action_check_office_location
    - utter_provide_office_location
* inform{"office_location": "lviv"}
    - slot{"office_location": "lviv"}
    - action_save_office_location
    - utter_location_saved
    - utter_ready_to_proceed
    - utter_ask_room_name
* inform
    - action_check_room_exists
    - slot{"is_room_exists": false}
    - utter_room_not_exists
    - utter_ask_room_name
* inform{"room_name": "factory"}
    - slot{"room_name": "factory"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - utter_ask_event_name
* inform
    - action_extract_free_text_event_name
    - slot{"event_name": "test with room not exists"}
    - utter_confirm_booking
* affirm
    - action_check_room_available
    - slot{"is_room_available": true}
    - action_book_room
    - slot{"success_booking": true}
    - utter_room_booked
    - action_reset_slots
* thank
    - utter_thank

## Deni during booking confirmations------------------------>>>>>>>>>>>>>>>>
## Generated Story -7581435261927789756 book room and ask: time, duration, and event name
* greet
    - utter_how_can_help
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
* inform{"time": "2018-11-14T14:00:00.000+02:00"}
    - slot{"time": "2018-11-14T14:00:00.000+02:00"}
    - utter_ask_duration
* inform{"duration": 3}
    - slot{"duration": 3}
    - action_get_new_slots
    - slot{"normalized_duration": 10800}
    - slot{"formatted_duration": "3 hours"}
    - utter_on_it
    - action_check_room_available
    - slot{"is_room_available": true}
    - utter_room_is_free
    - utter_ask_event_name
* inform
    - action_extract_free_text_event_name
    - slot{"event_name": "Classwallet meeting"}
    - utter_confirm_booking
* deny
    - utter_no_problem


## deny confirm but with more data
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
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - utter_room_is_free
    - utter_ask_event_name
* inform
    - action_extract_free_text_event_name
    - slot{"event_name": "Test bot meeting"}
    - utter_confirm_booking
* deny
    - utter_no_problem

## book room with room_name, time  and duration in one sentence
* book_room{"duration": 2, "room_name": "factory", "time": "2018-11-02T15:00:00.000+02:00"}
    - slot{"duration": 2}
    - slot{"room_name": "factory"}
    - slot{"time": "2018-11-02T15:00:00.000+02:00"}
    - action_get_new_slots
    - slot{"normalized_duration": 7200}
    - slot{"formatted_duration": "2 hours"}
    - action_check_auth_valid
    - slot{"auth_valid": true}
    - utter_user_authorized
    - action_reset_auth_valid_slot
    - slot{"auth_valid": false}
    - action_check_office_location
    - slot{"office_location": "vinnitsia"}
    - utter_on_it
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - utter_room_is_free
    - utter_ask_event_name
* inform
    - action_extract_free_text_event_name
    - slot{"event_name": "Test bot meeting"}
    - utter_confirm_booking
* deny
    - utter_no_problem
