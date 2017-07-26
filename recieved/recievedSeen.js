// Ce fichier implémente la logique à utiliser lorsqu'un utilisateur lit un message envoyé

var {sendTextMessage} = require('./../send/sendTextMessage');
var {getWaiting} = require('./../include/config');
var {setNotWaiting} = require('./../include/config');

var recievedSeen = (event) => {
  if (getWaiting()) {
    setTimeout(() => {
      if (getWaiting()) {
        console.log('Sending confirmation to user');
        sendTextMessage(event.sender.id, 'J\'attends toujours votre réponse !!');
        setNotWaiting();
      }
      else {
        console.log('Found that no longer waiting');
      }
    }, 5000);
  }
  else {
    console.log(`Waiting is ${getWaiting()}`);
  }
};

module.exports = {
  recievedSeen
};
