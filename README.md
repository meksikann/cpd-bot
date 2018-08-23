# cpd-event-bot
bot for manage user events in google-calendar
(bot build on node.js requasts to brain made in RASA-CORE)

1.install npm + node.js
2.insert  .env file with next variables:

```bash
MicrosoftAppId=<YOUR_MS_ID>
MicrosoftAppPassword=<YOUR_MS_PASSWORD>>
BOT_MANUAL=<URL_TO_MANUAL>>
```

3. install dependencies
```
npm install
```

3.1 Place credentials.json file (with google api creds) into src/helpers folder

4. start dev
``
npm start
``
or Build prod:
``
npm build
``
start prod 
``npm serve``
5. start RASA-CORE server on python hosted on same host

**_TODO need to make it work with rasa-core docker container_**

******************* run with docker *********************
```
sudo docker run --name cpd-bot -p 8282:8282 -d --network host cpd-bot
```

NOTE:
google api used to manege calendar events
https://developers.google.com/calendar/overview
