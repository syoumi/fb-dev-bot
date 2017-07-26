// Ce fichier implémente la logique à utiliser lorsqu'un utilisateur lit un message envoyé

var {waitingForAnswer} = require('./../include/config');

var recievedSeen = (event) => {
  if (waitingForAnswer) {
    setTimeout(() => {
      if (waitingForAnswer) {
        console.log('Sending confirmation to user');
        sendTextMessage(event.sender.id, 'J\'attends toujours votre réponse !!');
        waitingForAnswer = false;
      }
      else {
        console.log('Found that no longer waiting');
      }
    }, 5000);
  }
  else {
    console.log(`Waiting is ${waitingForAnswer}`);
  }
};

module.exports = {
  recievedSeen
};
