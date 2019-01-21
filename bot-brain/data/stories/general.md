## Generated Story 5768845475410152710
* order_food{"food_type": "steak"}
    - slot{"food_type": "steak"}
    - utter_what_steak_part
* inform{"food_type": "steak", "steak_type": "rump"}
    - slot{"food_type": "steak"}
    - slot{"steak_type": "rump"}
    - utter_how_steak_done
* inform{"steak_done": "rare"}
    - slot{"steak_done": "rare"}
    - utter_submit_order
* affirm
    - utter_make_payment
* thank
    - utter_thank
