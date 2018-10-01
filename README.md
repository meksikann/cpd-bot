# cpd-bot
Bot-builder used ad bot interface. Rasa-core used as bot-brain
bot-brain and bot-ui has it's own readmy

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
