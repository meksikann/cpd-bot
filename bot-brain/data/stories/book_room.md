
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


