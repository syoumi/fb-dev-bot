// Fichier de gestion du serveur backend

// Importation des package npm
const express = require('express');
const bodyParser = require('body-parser');

// Importation des fonctions
const {recievedMessage} = require('./recieved/recievedMessage');
const {recievedPostBack} = require('./recieved/recievedPostBack');
const {recievedSeen} = require('./recieved/recievedSeen');

// Importation des constantes
const {PORT} = require('./include/config');
const {VERIFY_TOKEN} = require('./include/config');

// Création d'une instance serveur
var app = express();

// Ajouter ces middlewares pour assurer le fonctionnement de express
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

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
        } else if (event.postback) {

          // On fait appel à une fonction qui gère la reception de tous les postbacks
          recievedPostBack(event);
        } else if (event.read) {

          // Si notre message à été vu par l'utilisateur
          // on donne un délai, puis on lui demande de répondre s'il n'a pas répondu
          recievedSeen(event);
        } else {

          // Rien à faire, event inconnu
          console.log("Webhook recieved unknown event : ", event);
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
