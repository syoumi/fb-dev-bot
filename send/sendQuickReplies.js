// Ce fichier implémente la logique d'envoi des message sous forme de quick replies

const {callSendAPI} = require('./sendViaFaceBookAPI');

var sendQuickReplies = (reciepientID, choices) => {
  var messageData = {
  recipient:{
      id: reciepientID
    },
    message:{
      text:"Volà les choix :",
      // On supposant que choices est un tableau bien structuré qui contient les choix
      quick_replies: choices
    }
  };

  callSendAPI(messageData);
};

module.exports = {
  sendQuickReplies
};
