// Ce fichier va implémenter la logique de l'envoi des simples message texte

const {callSendAPI} = require('./sendViaFaceBookAPI');

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

  // on appelle la fonction qui sera responsable d'envoyer le message à l'API FB
  callSendAPI(messageData);
};

module.exports = {
  sendTextMessage
};
