## Generated Story -4732201758630918547
* greet
    - utter_how_can_help
* check_room_available{"room_name": "factory", "time": "2018-11-16T15:51:30.000+02:00"}
    - slot{"room_name": "factory"}
    - slot{"time": "2018-11-16T15:51:30.000+02:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": false}
    - utter_room_is_busy

