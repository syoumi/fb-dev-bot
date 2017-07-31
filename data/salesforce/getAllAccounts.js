// In this file, we are getting all the accounts from salesfoce instance

var {doLogin} = require('./login');
var {sendTextMessageWithDelai} = require('./../../send/sendTextMessage');

var getAllAccounts = (senderID) => {
  doLogin((link) => {
    link.query("SELECT Id, Name FROM Account", (err, result) => {
      if (err) {
        return console.error('An error has occured while getting all accounts');
      }
      console.log('Result total size : ' , result.totalSize);
      console.log('Fetched : ' , result.records.length);
      // Sending some messages to user
      sendTextMessageWithDelai(senderID, `The total number of accounts is ${result.totalSize} :o`);

      link.logout((err) => {
        if (err) {
          console.error('Failed to logout');
        }
        console.log('Logged out');
      });
    });
  });
};

module.exports = {
  getAllAccounts
}
