## Generated Story -1619954158191188524
* greet
    - utter_how_can_help
* check_room_available{"room_name": "second conference room", "time": "2018-10-05T17:00:00.000+03:00"}
    - slot{"room_name": "second conference room"}
    - slot{"time": "2018-10-05T17:00:00.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - slot{"time": "2018-10-05T17:00:00.000+03:00"}
    - utter_room_is_free
* thank
    - utter_thank
* inform{"room_name": "first conference room"}
    - slot{"room_name": "first conference room"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - slot{"time": "2018-10-05T17:00:00.000+03:00"}
    - utter_room_is_free
* greet
    - utter_greet
* bye
    - utter_bye



