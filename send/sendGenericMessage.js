// Ce fichier va implémenter la logique de l'envoi d'un message generic
// Template par exemple

const {callSendAPI} = require('./sendViaFaceBookAPI');

var sendGenericMessage = (reciepientID) => {
  // on structure notre message, préparation pour l'envoi à l'API
  console.log('reciepientID', reciepientID);
  var messageData = {
    recipient: {
      id: reciepientID
    },
    message: {
      // Ce code est structuré selon la documentation facebook pour envoyer generic template
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          // On déclare les élements à afficher sur la template dans l'ordre dans un tableau d'objcts [{}]
          elements: [{
            // premier élémnt
            title: "Ce projet sur GitHub",
            subtitle: "Voilà, nous sommes sur github !",
            item_url: "https://github.com/syoumi/fb-dev-bot",
            image_url: "https://2017.l2tp.org/wp-content/uploads/2017/06/github-logo.jpg",
            // et encore un tableau de boutons à afficher pour notre premier element
            buttons: [{
              type: "web_url",
              url: "https://github.com/syoumi/fb-dev-bot",
              title: "Visiter notre repository"
            }, {
              type: "postback",
              title: "Faire un Postback",
              payload: "THIS_IS_MY_FIRST_CUSTOM_PAYLOAD_HAHA", // Cela va apparaitre sur la discussion comme si l'utilisateur l'a écrit
            }],
          }, {
            // deuxième elemnt, mm chose
            title: "Notre projet sur Facebook",
            subtitle: "Nous somme sur facebook également",
            item_url: "https://www.facebook.com/Salesbot-2-1753927908237792/",
            image_url: "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/20031718_1753927948237788_7936890941655242548_n.png",
            buttons: [{
              type: "web_url",
              url: "https://www.facebook.com/Salesbot-2-1753927908237792/",
              title: "Visiter notre page"
            }, {
              type: "postback",
              title: "Un autre Postback",
              payload: "JUST_ANOTHER_PAYLOAD",
            }]
          }]
        }
      }
    }
  };

  // Envoyer le messageData à l'api via notre fonction
  callSendAPI(messageData);
};

module.exports = {
  sendGenericMessage
};
