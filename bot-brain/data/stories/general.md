## greet
* greet
    - utter_greet

## thank
* thank
    - utter_thank

## bye
* bye
    - utter_bye

## help
* help
    - utter_help

## Generated Story 3647145078148579248
* greet
    - utter_greet
    - utter_how_can_help
* help
    - utter_help
* greet
    - utter_greet
* bye
    - utter_bye
* help
    - utter_help
* bye
    - utter_bye

## Generated Story -5994942323373592500
* bye
    - utter_bye

## Generated Story -3049433139092484392
* None
    - utter_fallback
* greet
    - utter_greet
* None
    - utter_fallback
    
## Generated Story -815529008914980199
* greet
    - utter_greet
    - utter_how_can_help
    
## Generated Story 5979367591361466411
* greet
    - utter_how_can_help
* how_are_you
    - utter_responce_how_are_you
* got_it
* who_are_you
    - utter_responce_who_are_you
* got_it
* thank
    - utter_thank

## Generated Story 3900776049142858721
* who_are_you
    - utter_responce_who_are_you
* get_room_free_slots{"room_name": "factory"}
    - slot{"room_name": "factory"}
    - action_check_room_exists
    - action_get_room_free_slots
    - utter_show_free_slots
* got_it
    - utter_responce_got_it
* thank
    - utter_thank
    
## Generated Story 5979367591361466411
* greet
    - utter_how_can_help
* how_are_you
    - utter_responce_how_are_you
* affirm
    - utter_responce_got_it
    
## Generated Story 7855210119185125411
* greet
    - utter_greet
    - utter_how_can_help
* how_are_you
    - utter_responce_how_are_you
* affirm
    - utter_responce_got_it
    
## Generated Story -450656076315073450
* help
    - utter_help
* got_it
    - utter_responce_got_it
* help
    - utter_help
* how_are_you
    - utter_responce_how_are_you
* affirm
    - utter_responce_got_it
* thank
    - utter_thank
* check_room_available{"time": "2018-10-27T16:00:00.000+03:00"}
    - slot{"time": "2018-10-27T16:00:00.000+03:00"}
    - utter_ask_room_name
* inform{"room_name": "space"}
    - slot{"room_name": "space"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - utter_room_is_free
* affirm
    - utter_responce_got_it
    
## Generated Story -4019044786036465472
* greet
    - utter_how_can_help
* check_room_available{"room_name": "factory", "time": "2018-10-26T16:50:37.000+03:00"}
    - slot{"room_name": "factory"}
    - slot{"time": "2018-10-26T16:50:37.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - utter_room_is_free
* affirm
    - utter_responce_got_it
* thank
    - utter_thank
* affirm
    - utter_responce_got_it
* affirm
    - utter_responce_got_it
* affirm
    - utter_responce_got_it


    

