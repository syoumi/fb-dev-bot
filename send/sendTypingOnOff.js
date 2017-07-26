// Rendre le bot en train d'écrire ou non, ou laisser un vu :D

const {callSendAPI} = require('./sendViaFaceBookAPI');

// Fonction pour commencer l'écriture
var sendTypingOn = (recipientID) => {
  // On construit l'object qui contient les informations à envoyer
  var messageData = {
    recipient: {
      id: recipientID
    },
    // le propriété concernée
    sender_action: 'typing_on'
  };

  // Envoyer l'obj via API FB
  callSendAPI(messageData);
};

// fonction pour arreter l'écriture
var sendTypingOff = (recipientID) => {
  // On construit l'object qui contient les informations à envoyer
  var messageData = {
    recipient: {
      id: recipientID
    },
    // le propriété concernée
    sender_action: 'typing_off'
  };

  // Envoyer l'obj via API FB
  callSendAPI(messageData);
};

// fonction pour laisser un VU
var sendSeen = (recipientID) => {
  // On construit l'object qui contient les informations à envoyer
  var messageData = {
    recipient: {
      id: recipientID
    },
    // le propriété concernée
    sender_action: 'mark_seen'
  };

  // Envoyer l'obj via API FB
  callSendAPI(messageData);
};


module.exports = {
  sendTypingOn,
  sendTypingOff,
  sendSeen
}
