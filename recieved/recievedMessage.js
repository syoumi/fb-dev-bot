// Ce fichier contient la logique de la reception des events de type 'Message Event'

const {sendGenericMessage} = require('./../send/sendGenericMessage');
const {sendTextMessage} = require('./../send/sendTextMessage');
const {sendQuickReplies} = require('./../send/sendQuickReplies');
const {sendTypingOn} = require('./../send/sendTypingOnOff');
const {sendTypingOff} = require('./../send/sendTypingOnOff');

var {setNotWaiting} = require('./../include/config');
var {getWaiting} = require('./../include/config');
var {getUserInfos} = require('./../retrieve/getUserInfos');
var {sendPictureMessage} = require('./../send/sendPictureMessage');
var {getAllAccounts} = require('./../data/salesforce/getAllAccounts');

var recievedMessage = (event) => {
  // On extrait quelques informations
  // 1. le Facebook ID du sender
  var senderID = event.sender.id;
  // 2. le Facebook ID du recipient
  var recipientID = event.recipient.id;
  // 3. le temps d'envoi du message
  var timeOfMessage = event.timestamp;
  // 4. le corps du message (C'est pas le texte)
  var message = event.message;

  // On log les informations sur le serveur (sorte d'hitorique)
  console.log(`### Message event informations ###`);
  console.log(`| senderID : ${senderID}, recipientID ${recipientID}, timeOfMessage ${timeOfMessage}`);
  console.log(`| message body : ${message}`);
  console.log(`################end MEI ################`);

  // Set waiting to false
  setNotWaiting();

  // On prend plus d'informations
  // 5. l'Identifiant du message
  var messageID = message.mid;
  // 6. le corps du message TEXTE
  var messageText = message.text;
  // 7. les pièces jointes si dispo bien sur
  var messageAttachments = message.attachments;

  if (messageText) {

    // Si le message contient du texte
    // on mets des switch case sur le contenu du message pour décider comment répondre
    switch (messageText) {
      case 'generic':
        // on utilise une fonction qui va s'occuper de répondre avec un generic template
        sendGenericMessage(senderID);
        break;

      case 'QCM':
        // on crée un tableau qui maintient les choix et on appelle une fonction qui réponds
        var choices = [
          {
            content_type: 'text',
            title: 'Nice',
            payload: 'NICE_CUSTOM_POSTBACK'
          },
          {
            content_type: 'text',
            title: 'Not bad',
            payload: 'NOT_BAD_CUSTOM_POSTBACK'
          },
          {
            content_type: 'text',
            title: 'Not nice',
            payload: 'NOT_NICE_CUSTOM_POSTBACK'
          }
        ];

        sendQuickReplies(senderID, choices);

        break;

      case 'Tu me connais?':
        // Message initial
        sendTextMessage(senderID, 'Je pense que oui ...');
        // Délai puis déclancher en train d'écrire
        setTimeout(function () {
          sendTypingOn(senderID);
        }, 1000);
        // encore un délai puis envoi des informations back
        setTimeout(function () {
          getUserInfos(senderID, (fname, lname, ppicture, locale) => {
            sendTextMessage(senderID, `Vous êtes ${fname} ${lname}`);
            // sendTextMessage(senderID, `Votre paramètre de région et langue est ${locale}`);
            sendPictureMessage(senderID, ppicture);
          });
        }, 3000);

        break;

      case 'login':
        getAllAccounts();
        break;

      default:
        // faire un petit délai pour simuler l'écriture
        // 1. on rend le bot en train d'écriture
        sendTypingOn(senderID);
        // par défaut, on renvoi le même message
        // à l'aide d'une fonction qui s'occupe d'envoyer un message texte simple
        setTimeout(() => {
          sendTextMessage(senderID, messageText);
          // Ce n'est pas la peine de désactiver typing_on parce que ça se
          // désactive automatiquement après l'envoi d'un message
        }, 2500);
        // sendTextMessage(senderID, messageText);
        break;
    }
  } else if (messageAttachments) {

    // C'est le cas ou le message contient des pièces jointes
    // normalement ça doit être plus complexe, mais bon on va se contenter de ça
    // envoyer un message texte simple ...
    sendTextMessage(senderID, 'Pièce jointe bien reçue <3 ^_^ !');
  }

};

module.exports = {
  recievedMessage
}
