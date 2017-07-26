// Ce fichier implémente la logique de la manipulation des postbacks

const {sendTextMessage} = require('./../send/sendTextMessage');

var recievedPostBack = (event) => {
  // On commence toujours par avoir les coordonnées/informations
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostBack = event.timestamp;

  // On récupère le payload (Qu'on défini lors de la création du bouton)
  // pour savoir quelle action à executer
  var payload = event.postback.payload;

  // On se contente ici uniquement de logger les informations et envoyer du texte
  console.log(`### Postback recieved informations ###`);
  console.log(`senderID ${senderID}, recipientID ${recipientID}, time ${timeOfPostBack}`);
  console.log('#################END PRI##############');

  sendTextMessage(senderID, 'Postback recu avec succes');
};

module.exports = {
  recievedPostBack
}
