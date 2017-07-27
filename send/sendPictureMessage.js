// Envoi d'une réponse sous forme d'une image

const {callSendAPI} = require('./sendViaFaceBookAPI');

var sendPictureMessage = (recipientID, pictureURL) => {
  // on construit l'object qui va contenir le corps du message
  var messageData = {
    recipient: {
      id: recipientID
    },
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: pictureURL
        }
      }
    }
  };

  // On envoi via l'API Facebook tjrs
  callSendAPI(messageData);
};

module.exports = {
  sendPictureMessage
}
