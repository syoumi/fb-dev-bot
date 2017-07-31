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
  // Assuming thet the bot will be typing 3 characters per second
  // the delai will be
  var delai = ( textMessage.length / 3 ) * 1000; // in Milliseconds

  sendTypingOn(recipientID);
  
  setTimeout(function () {
    sendTextMessage(recipientID, textMessage);
  }, delai);
};

module.exports = {
  sendTextMessageWithDelai,
  sendTextMessage
};
