// This file is for sending Bulk text messages

const {callSendAPI} = require('./sendViaFaceBookAPI');

var {setWaiting} = require('./../include/config');
var {getWaiting} = require('./../include/config');
var {sendTypingOn} = require('./sendTypingOnOff');
var {sendTextMessage} = require('./sendTextMessage');

var sendBulkTextMessages = (recipientID, messages) => {
  console.log('messages ' , messages);
  messages.forEach(function (message) {
    console.log('Iteration over messages, message ' , message);
    // constructing the message object to send to the API
    var messageData = {
      recipient: {
        id: reciepientID
      },
      message: {
        text: message
      }
    };
    console.log('message data : ' , messageData);

    // If it's an important message, we will be waiting for answer
    if (textMessage === 'Test?') {
      setWaiting();
    }

    // calling the facebook API to send the data
    callSendAPI(messageData);

    // // making a small delai between messages
    // setTimeout(() => {
    //   // nothing to do...
    // }, 1000);
  });
};

var sendBulkTextMessagesWithDelai = (reciepientID, messages) => {
  messages.forEach((message) => {
    // Assuming thet the bot will be typing 3 characters per second
    // the delai will be
    var delai = ( message.length / 3 ) * 1000; // in Milliseconds

    sendTypingOn(recipientID);

    setTimeout(() => {
      sendTextMessage(recipientID, message);
    }, delai);
  });
};

module.exports = {
  sendBulkTextMessages,
  sendBulkTextMessagesWithDelai
}
