
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

