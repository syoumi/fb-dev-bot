// Ce fichier va implémenter la logique de l'envoi des simples message texte

const {callSendAPI} = require('./sendViaFaceBookAPI');

var {waitingForAnswer} = require('./../include/config');

var sendTextMessage = (reciepientID, textMessage) => {

  // on construit l'object qui va contenir le corps du message
  var messageData = {
    recipient: {
      id: reciepientID
    },
    message: {
      text: textMessage
    }
  };

  // si c'est une question, on mentionne qu'on attend une réponse
  if (textMessage === 'Test?') {
    waitingForAnswer = true;
  }

  // on appelle la fonction qui sera responsable d'envoyer le message à l'API FB
  callSendAPI(messageData);
};

module.exports = {
  sendTextMessage
};
