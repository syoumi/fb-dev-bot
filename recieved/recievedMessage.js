// Ce fichier contient la logique de la reception des events de type 'Message Event'
var recievedMessage = (event) => {
  // On extrait quelques informations
  // 1. le Facebook ID du sender
  var senderID = event.sender.id;
  // 2. le Facebook ID du recipient
  var recipientID = event.recipient.id;
  // 3. le temps d'envoi du message
  var timeOfMessage = event.timestamp;
  // 4. le corps du message texte
  var message = event.message;

  // On log les informations sur le serveur (sorte d'hitorique)
  console.log(`### Message event informations ###`);
  console.log(`| senderID : ${senderID}, recipientID ${recipientID}`);
  console.log(``);
};

module.exports = {
  recievedMessage
}
