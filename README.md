# cpd-bot
bot for manage user events in google-calendar
(bot build on node.js requasts to brain made in RASA-CORE)

1.install npm + node.js
2.insert  .env file with next variables:

```bash
MicrosoftAppId=<YOUR_MS_ID>
MicrosoftAppPassword=<YOUR_MS_PASSWORD>>
BOT_MANUAL=<URL_TO_MANUAL>>
```

3. npm install
4. npm start
5. start RASA-CORE server on python hosted on same host

start app run:

```bash
npm start
```

******************************** run with docker *********************
sudo docker run --name cpd-bot -p 8282:8282 -d --network host cpd-bot
