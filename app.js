const express = require('express');
const config = require('./include/config.js');
const {recievedMessage} = require('./recieved/recievedMessage');

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

// Cette fonction est responsable de recevoir les appels POST
// càd tous les events envoyé depuis la page

app.post('/webhook', (req, res) => {
  var data = req.body;

  // On doit s'assurer que ça provient d'une page inscrite
  if (data.object === 'page') {
    // Le principe ici est identique au BULKification en SF
    // Il se peut que la même requete porte plusieurs messages (Batch)

    data.entry.forEach((oneEntry) => {
      var pageID = oneEntry.id;
      var timeOfEvent = oneEntry.time;

      // On doit balayer tous les message events
      oneEntry.messaging.forEach((event) => {

        // On va traiter ici que les message events
        if (event.message) {

          // On fait appel à une fonction qui va gérer la reception d'un message event
          recievedMessage(event);
        } else {

          // Rien à faire, event inconnu
          console.log("Webhook recieved unknown event : ", JSON.stringify(event, undefined, 2));
        }
      });
    });

    // Voilà, en tout cas un 200 doit être forwarded!
    res.sendStatus(200); //OK!
  }
});

// Cette fonction est responsable de rendre le serveur en écoute

app.listen(PORT, () => {
  console.log(`Listening to incoming connections on port ${PORT} ...`);
});
