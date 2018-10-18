# cpd-bot

##  Docker run
Bot-builder used ad bot interface. Rasa-core used as bot-brain
bot-brain and bot-ui has it's own readmy

If you're not using docker-compose, make sure to install Mongo.
Make sure you've trained your bot before running and mount models to defined volumes
RUN bot using docker:

just type:

``docker-compose up``

Or run separate dockers.

bot ui
```angular2html
sudo docker run --name cpd-bot -p 8282:8282  --network host serhiyskoromets/cpd-bot-ui
```

duckling nlu
```angular2html
sudo docker run -p 8000:8000 rasa/duckling
```
bot brain (rasa-core)
```angular2html
sudo docker run --name rasa-bot-core -p 5002:5002  --network host serhiyskoromets/rasa-bot-core
```

In MS Bot-framework set url:

``https://your-bot-host/webhooks/botframework/webhook``


## Development
### Bot-ui
1. git clone https://github.com/meksikann/cpd-bot.git
2. install npm + node.js
3. insert  .env file with next variables:

```bash
MicrosoftAppId=<YOUR_MS_ID>
MicrosoftAppPassword=<YOUR_MS_PASSWORD>>
BOT_MANUAL=<URL_TO_MANUAL>>
NODE_ENV=development
```
4. install dependencies
```
npm install
```

4.1 Place `credentials.json` and `token.json` file (with google api creds) into src/creds folder

NOTE:
google api used to manege calendar events
https://developers.google.com/calendar/overview

5. start RASA-CORE server on python hosted on same host (explained below)
6. start duckling container ``sudo docker run -p 8000:8000 rasa/duckling
``
7. if use ngrok ``./ngrok http 5002 -host-header="localhost:5002"  ``

8. start dev
``
npm start
``
or Build prod:
``
npm build
``
start prod 
``npm serve``

### Bot-brain (Rasa-core server)

 To run server separately
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
 or install all dependencies ever needed
 ```
 pip install -r alt_requirements/requirements_full.txt
 ```
 *****************************************************************

Paste credentials.yml into root `creds` directiory.
credentials.yml content:
```
botframework:
  app_id: "MICROSOFT_APP_ID"
  app_password: "MICROSOFT_APP_PASSWORD"
  ```
  
To train the NLU model, run ``make train-nlu``

To train the Core model, run ``make train-core``

To run the core-server on the command line run ``make core-server``

Run Interactive learning ``make core-learn``
NOTE: during interactive leaning rasa-core connect to existing action server, which may 
cause real data change. TODO: make separet action-server for learning.





