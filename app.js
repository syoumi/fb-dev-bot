const express = require('express');
const config = require('./include/config.js');

var app = express();

// Cette fonction est responsable d'effectuer la première verification FB

app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VERIFY_TOKEN) {
      console.log("Validating webhook");
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error("Failed validation webhook. Make sure the validation tokens match.");
      res.sendStatus(403);
    }
});
