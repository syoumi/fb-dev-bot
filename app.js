const express = require('express');
const config = require('./include/config.js');

var app = express();

const PORT = process.env.PORT || 9191;

// Cette fonction est responsable d'effectuer la première verification FB

app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.VERIFY_TOKEN) {
      console.log("Validating webhook");
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error("Failed validation webhook. Make sure the validation tokens match.");
      res.sendStatus(403);
    }
});

// Cette fonction est responsable de rendre le serveur en écoute

app.listen(PORT, () => {
  console.log(`Listening to incoming connections on port ${PORT} ...`);
});
