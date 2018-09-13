from rasa_core.actions import Action
from rasa_core.events import SlotSet
import json
# from rasa_core_sdk import Action

class CreateEvent(Action):

    def name(self):
        # you can then use action_example in your stories
        return "action_create_event"

    def run(self, dispatcher, tracker, domain):
        # what your action should do
        return []

class RemoveEvent(Action):

    def name(self):
        # you can then use action_example in your stories
        return "action_remove_event"

    def run(self, dispatcher, tracker, domain):
        # what your action should do
        return []

class ShowMyEvents(Action):

    def name(self):
        # you can then use action_example in your stories
        return "action_show_my_events"

    def run(self, dispatcher, tracker, domain):
        # what your action should do
        return []

class CheckRoomAvailable(Action):

    def name(self):
        # you can then use action_example in your stories
        return "action_check_room_available"

    def run(self, dispatcher, tracker, domain):
        print('test check room available action=====================>')
        connection_file = open('learning_data.json', 'r')
        learn_data = json.load(connection_file)
        connection_file.close()

        print(learn_data["is_room_available"])
        time_slot = tracker.get_slot("time") if tracker.get_slot("time") is not None else learn_data["time"]
        print('time slot ======>', time_slot)
        # the action will receive data form learning-data-file ,which might be changed during learning process
        return [SlotSet("is_room_available", learn_data["is_room_available"]),
                SlotSet("time", time_slot)]

class CheckRoomExists(Action):

    def name(self):
        # you can then use action_example in your stories
        return "action_check_room_exists"

    def run(self, dispatcher, tracker, domain):
        print('test check room exists action=====================>')
        connection_file = open('learning_data.json', 'r')
        learn_data = json.load(connection_file)
        connection_file.close()

        print(learn_data["is_room_exists"])

        # the action will receive data form learning-data-file ,which might be changed during learning process
        return [SlotSet("is_room_exists", learn_data["is_room_exists"])]
