// File purpose is testing, get last 3 accounts

var {doLogin} = require('./login');
var {sendTextMessageWithDelai} = require('./../../send/sendTextMessage');

var getLastAccounts = (senderID) => {
  doLogin((link) => {
    var records = [];
    link.query("SELECT Id, Name FROM Account LIMIT 3")
        .on('record', (record) => {
          records.push(record);
        })
        .on('end', () => {
          console.log('Getting last accounts finished');
        })
        .on('error', (err) => {
          console.error('Error occured while getting last 3 accounts...');
        })
        .run({autoFetch: true});
    sendTextMessageWithDelai(senderID, 'Look, I found something for you !');
    if (records[0]) {
      sendTextMessageWithDelai(senderID, `The first account name is ${records[0].Name}`);
    }

    link.logout((err) => {
      if (err) {
        console.error('Failed to logout');
      }
      console.log('Logged out');
    });
  });
};

module.exports = {
  getLastAccounts
}
