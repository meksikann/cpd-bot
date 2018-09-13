
## Generated Story 7354615498554762936
* greet
    - utter_how_can_help
* check_room_available{"room_name": "first conference room", "time": "2018-09-12T16:56:10.000+03:00"}
    - slot{"room_name": "first conference room"}
    - slot{"time": "2018-09-12T16:56:10.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - slot{"time": "2018-09-12T16:56:10.000+03:00"}
    - utter_room_is_free
* thank
    - utter_thank
* check_room_available{"time": "2018-10-03T00:00:00.000+03:00"}
    - slot{"time": "2018-10-03T00:00:00.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": false}
    - utter_room_not_exists
    - utter_ask_room_name
* inform{"room_name": "first conference room"}
    - slot{"room_name": "first conference room"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - slot{"time": "2018-10-03T00:00:00.000+03:00"}
    - utter_room_is_free
* thank
    - utter_thank
* create_event
    - export
