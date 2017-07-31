// This file is for sending Bulk text messages

const async = require('async');

const {callSendAPI} = require('./sendViaFaceBookAPI');
const {syncCallSendAPI} = require('./sendViaFaceBookAPI');

var {setWaiting} = require('./../include/config');
var {getWaiting} = require('./../include/config');
var {sendTypingOn} = require('./sendTypingOnOff');
var {sendTextMessage} = require('./sendTextMessage');

var sendBulkTextMessages = (recipientID, messages) => {
  async.eachSeries(messages, (message, callback) => {
    var messageData = {
      recipient: {
        id: recipientID
      },
      message: {
        text: message
      }
    };

    // If it's an important message, we will be waiting for answer
    if (message === 'Test?') {
      setWaiting();
    }
    console.log('Sending to API ...');
    syncCallSendAPI(messageData, callback);
  });
};

var sendBulkTextMessagesWithDelai = (recipientID, messages) => {
  async.eachSeries(messages, (message, callback) => {
    // Assuming thet the bot will be typing 3 characters per second
    // the delai will be
    var delai = ( message.length / 3 ) * 1000; // in Milliseconds
    sendTypingOn(recipientID);
    setTimeout(() => {
      var messageData = {
        recipient: {
          id: recipientID
        },
        message: {
          text: message
        }
      };

      // If it's an important message, we will be waiting for answer
      if (message === 'Test?') {
        setWaiting();
      }

      syncCallSendAPI(messageData, callback);
    }, delai);
  });
};

module.exports = {
  sendBulkTextMessages,
  sendBulkTextMessagesWithDelai
}
