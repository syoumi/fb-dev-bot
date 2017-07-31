// Ce fichier va implémenter la logique de l'envoi des simples message texte

const {callSendAPI} = require('./sendViaFaceBookAPI');

var {setWaiting} = require('./../include/config');
var {getWaiting} = require('./../include/config');
var {sendTypingOn} = require('./sendTypingOnOff');


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
    setWaiting();
  }

  // on appelle la fonction qui sera responsable d'envoyer le message à l'API FB
  callSendAPI(messageData);
};

var sendTextMessageWithDelai = (recipientID, textMessage) => {
  // We will pick up a random delai between 50 and 500 Milliseconds / character
  // to simulate bot is typing on
  var delai = parseInt(Math.random() * ( 500 - 50 ) + 50) * textMessage.length;

  sendTypingOn(recipientID);

  setTimeout(() => {
    sendTextMessage(recipientID, textMessage);
  }, delai);
};

module.exports = {
  sendTextMessageWithDelai,
  sendTextMessage
};
