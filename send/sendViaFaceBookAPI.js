// Ce fichier est responsable d'envoi des donnée message texte via l'API FB

const request = require('request');
const {FB_PAGE_TOKEN} = require('./../include/config');

var callSendAPI = (messageData, callback) => {
  // On utilise le module REQUEST pour envoyer des requetes HTTP à l'API FB
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: FB_PAGE_TOKEN
    },
    method: 'POST',
    json: messageData
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {

      // Si y a pas d'error est le status est 200 => OK
      // On récupère quelques informations
      var recipientID = body.recipient_id;
      var messageID = body.message_id;

      // On fait un log
      console.log(`#### Message sent informations ####`);
      console.log(`| recipientID ${recipientID}`);
      console.log(`| messageID ${messageID}`);
      console.log(`################END MSI############`);
    } else {

      // Si il y avait une erreur HTTP, faire un log
      console.error(`#### Message sent errors ####`);
      // console.error(response);
      console.error(error);
      console.error(`################END MSE######`);
    }
    return Promise.resolve();

  });
};

module.exports = {
  callSendAPI
};
