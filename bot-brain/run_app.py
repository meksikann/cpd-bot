from rasa_core.agent import Agent
from rasa_core.interpreter import RasaNLUInterpreter
from ga_connector import GoogleConnector
from rasa_core.utils import EndpointConfig


action_endpoint = EndpointConfig(url="http://localhost:8282/webhook")
nlu_interpreter = RasaNLUInterpreter('./models/current/nlu')

generator = EndpointConfig(url="http://localhost:8282/nlg")
agent = Agent.load('./models/current/dialogue', interpreter = nlu_interpreter, action_endpoint=action_endpoint , generator=generator)

input_channel = GoogleConnector()
agent.handle_channels([input_channel], 5002, serve_forever=True)
