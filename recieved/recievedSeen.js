// Ce fichier implémente la logique à utiliser lorsqu'un utilisateur lit un message envoyé

const {WAITING_BEFORE_PROMPT} = require('./../include/config');

var {sendTextMessage} = require('./../send/sendTextMessage');
var {getWaiting} = require('./../include/config');
var {setNotWaiting} = require('./../include/config');

var recievedSeen = (event) => {
  // On prend quelques informations
  var senderID = event.sender.id;
  // le temps d'occurence de l'event
  var eventTime = event.timestamp;
  // tous les messages envoyé après le watermark (timestamp) on été vus
  var waterMark = event.read.watermark;

  console.log(`Messages to ${senderID} are all seen at ${waterMark}.`);

  // Si on est en train d'attendre une information de l'utilisateur, on déclanche un compteur
  if (getWaiting()) {
    setTimeout(() => {
      // après la fin du contdown, on envoi un message de confirmation à l'utilisateur
      if (getWaiting()) {
        console.log('Timeout, user will be propmted again');
        sendTextMessage(event.sender.id, 'J\'attends toujours votre réponse !?');

        // Ce n'est pas la peine de rappeler l'utilisateur plus qu'une fois
        // donc après la confirmation on RESET l'indicateur waiting or not
        setNotWaiting();
      }
      else {
        // si après la fin du countdown on trouve que le BOT n'est plus en attente, on fait rien
        // Exemple: l'utilisateur à répondu avant la fin du countdown
        console.log('BOT is not longer waiting');
      }
    }, WAITING_BEFORE_PROMPT);
  }
  else {
    // si dès le début le BOT n'attends pas d'informations importantes, rien à faire
    console.log(`Nothing to do cuz waiting is ${getWaiting()}`);
  }
};

module.exports = {
  recievedSeen
};
