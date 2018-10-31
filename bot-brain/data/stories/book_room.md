
## initial story 1
* book_room
    - action_check_auth_valid
    - slot{"auth_valid": false}
    - utter_user_not_authorized
    
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


