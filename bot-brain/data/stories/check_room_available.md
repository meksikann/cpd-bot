
## Generated Story 7354615498554762936
* greet
    - utter_greet
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

## Generated Story 7661465693707347508
* check_room_available{"room_name": "first conference room", "time": "2018-09-13T10:38:51.000+03:00"}
    - slot{"room_name": "first conference room"}
    - slot{"time": "2018-09-13T10:38:51.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": false}
    - slot{"time": "2018-09-13T10:38:51.000+03:00"}
    - utter_room_is_busy
* thank
    - utter_thank

## Generated Story -1857005876918346782
* greet
    - utter_greet
    - utter_how_can_help
* check_room_available{"room_name": "second conferance room", "time": "2018-09-13T14:00:00.000+03:00"}
    - slot{"room_name": "second conferance room"}
    - slot{"time": "2018-09-13T14:00:00.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": false}
    - slot{"time": "2018-09-13T14:00:00.000+03:00"}
    - utter_room_is_busy

## Generated Story 8402366997527664421
* greet
    - utter_greet
    - utter_how_can_help
* check_room_available{"time": "2018-09-13T13:00:00.000+03:00"}
    - slot{"time": "2018-09-13T13:00:00.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": false}
    - utter_room_not_exists
* check_room_available{"room_name": "fifs room"}
    - slot{"room_name": "fifs room"}
    - action_check_room_exists
    - slot{"is_room_exists": false}
    - utter_room_not_exists
* check_room_available{"room_name": "second conferance room"}
    - slot{"room_name": "second conferance room"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": false}
    - slot{"time": "2018-09-13T13:00:00.000+03:00"}
    - utter_room_is_busy
* thank
    - utter_thank


## Generated Story 4379882245625173583
* check_room_available{"time": "2018-09-13T10:49:51.000+03:00"}
    - slot{"time": "2018-09-13T10:49:51.000+03:00"}
    - utter_ask_room_name
* None
* check_room_available{"room_name": "second conference room"}
    - slot{"room_name": "second conference room"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - slot{"time": "2018-09-13T10:49:51.000+03:00"}
    - utter_room_is_free
* thank
    - utter_thank
* check_room_available{"time": "2018-09-13T15:00:00.000+03:00"}
    - slot{"time": "2018-09-13T15:00:00.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - slot{"time": "2018-09-13T15:00:00.000+03:00"}
    - utter_room_is_free
* thank
    - utter_thank

## Generated Story 3909685037926823212
* greet
    - utter_greet
    - utter_how_can_help
* check_room_available{"room_name": "first conference room"}
    - slot{"room_name": "first conference room"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": false}
    - slot{"time": "2018-09-12T13:00:00.000+03:00"}
    - utter_room_is_busy
* check_room_available{"room_name": "second", "time": "2018-10-02T00:00:00.000+03:00"}
    - slot{"room_name": "second"}
    - slot{"time": "2018-10-02T00:00:00.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": false}
    - utter_room_not_exists

## Generated Story 5134624688406299689
* check_room_available{"room_name": "first conference room", "time": "2018-09-13T14:11:25.000+03:00"}
    - slot{"room_name": "first conference room"}
    - slot{"time": "2018-09-13T14:11:25.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - slot{"time": "2018-09-13T14:11:25.000+03:00"}
    - utter_room_is_free
* inform{"room_name": "second one", "time": "2018-10-02T00:00:00.000+03:00"}
    - slot{"room_name": "second one"}
    - slot{"time": "2018-10-02T00:00:00.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - slot{"time": "2018-10-02T00:00:00.000+03:00"}
    - utter_room_is_free

## Generated Story 9029682531094444998
* greet
    - utter_greet
    - utter_how_can_help
* check_room_available{"room_name": "second conference room", "time": "2018-09-13T15:15:00.000+03:00"}
    - slot{"room_name": "second conference room"}
    - slot{"time": "2018-09-13T15:15:00.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": false}
    - slot{"time": "2018-09-13T15:15:00.000+03:00"}
    - utter_room_is_busy
* check_room_available{"room_name": "first conference room", "time": "2018-10-01T00:00:00.000+03:00"}
    - slot{"room_name": "first conference room"}
    - slot{"time": "2018-10-01T00:00:00.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - slot{"time": "2018-10-01T00:00:00.000+03:00"}
    - utter_room_is_free
* are_you_sure
    - utter_sure

## Generated Story 4379882245625173583
* check_room_available{"time": "2018-09-13T10:49:51.000+03:00"}
    - slot{"time": "2018-09-13T10:49:51.000+03:00"}
    - utter_ask_room_name
* None
* check_room_available{"room_name": "second conference room"}
    - slot{"room_name": "second conference room"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - slot{"time": "2018-09-13T10:49:51.000+03:00"}
    - utter_room_is_free
* are_you_sure
    - utter_sure
* thank
    - utter_thank
* check_room_available{"time": "2018-09-13T15:00:00.000+03:00"}
    - slot{"time": "2018-09-13T15:00:00.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": true}
    - slot{"time": "2018-09-13T15:00:00.000+03:00"}
    - utter_room_is_free
* thank
    - utter_thank

## Generated Story -5457297304854273626
* greet
    - utter_greet
    - utter_how_can_help
* check_room_available{"room_name": "first conference room", "time": "2018-09-14T13:00:00.000+03:00"}
    - slot{"room_name": "first conference room"}
    - slot{"time": "2018-09-14T13:00:00.000+03:00"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_check_room_available
    - slot{"is_room_available": false}
    - slot{"time": "2018-09-14T13:00:00.000+03:00"}
    - utter_room_is_busy
* get_room_free_slots
    - action_get_room_free_slots
    - slot{"rooms_free_slots": [{"room_name": "first conference room", "room_id": "myid.com_os8ir3jmid199q9l0@group.calendar.google.com", "free_slots": [{"start": "2018-09-12T13:00:00.000+03:00", "end": "2018-09-12T13:30:00.000+03:00"}]}]}
    - utter_show_free_slots
* thank
    - utter_thank

## Generated Story 8368002419989898846
* greet
    - utter_greet
    - utter_how_can_help
* check_room_available{"room_name": "first conference room"}
    - slot{"room_name": "first conference room"}
    - action_check_room_exists
    - slot{"is_room_exists": true}
    - action_get_room_free_slots
    - slot{"rooms_free_slots": [{"room_name": "first conference room", "room_id": "myid.com_os8ir3jmid199q9l0@group.calendar.google.com", "free_slots": [{"start": "2018-09-12T13:00:00.000+03:00", "end": "2018-09-12T13:30:00.000+03:00"}]}]}
    - utter_show_free_slots
