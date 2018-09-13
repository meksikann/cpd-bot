used starter Pack for Rasa Stack

For more information on the Rasa Stack, please visit the docs here:
- [Rasa Core](https://core.rasa.com/)
- [Rasa NLU](https://nlu.rasa.com/)

## Setup
```
pip install rasa_core
```


RASA-NLU with spyCy ***************************************
```
pip install rasa_nlu[spacy]
python -m spacy download en_core_web_md
python -m spacy link en_core_web_md en
```

   == for tensorflow *****************************************
```
pip install rasa_nlu[tensorflow]
```
To install the necessary requirements, run:

```
pip install -r requirements.txt
```
install all dependencies ever needed
```
pip install -r alt_requirements/requirements_full.txt
```
*****************************************************************

## Usage

Run duckling docker container if you use ner_duckling_http in pipeline (duckling used to recognize mostly etc. dates https://duckling.wit.ai/)
http://rasa.com/docs/nlu/master/components/#id2

```
docker run -p 8000:8000 rasa/duckling
```


Before train nlu data take a look at nlu_data.md = need to type in proper data for training.
 Specially Synonyms part, as for now it is made as example.
 remember Synonyms maps synonym to entity, but you need to make a proper training data with synonyms...
Rememeber! when entity name ans slot name are equal slot set automaticaly when intent received.
To train the NLU model, run ``make train-nlu``

To train the Core model, run ``make train-core``

To run the bot on the command line run ``make cmdline``
To run the core-server on the command line run ``make core-server``
## test nlp url:
http://localhost:5005/conversations/default/parse?query=hello

## Interactive learning
 ``make core-learn``
 then proceed conversation like here https://rasa.com/docs/core/interactive_learning/
 to execute ations during training make sure actions.py RUN methods do what needs to be done..
 e.g  if bot needs to execute action_check_room_available ,
 the CheckRoomAvailable.run must set slot is_room_available TRUE/FALSE, deppending if room available.
 Used fake data from learning_data.json

the second possible way to execute actions is here
https://rasa.com/docs/core/customactions/ Custom Actions.
