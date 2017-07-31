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
        .run({autoFetch: true}, (err, response) => {
          if (err) {
            return console.error('Error occured while executing query');
          }
          console.log(response);
          // sendTextMessageWithDelai(senderID, 'Look, I found something for you !');
          if (response.records[0]) {
            sendTextMessageWithDelai(senderID, `The first account name is ${response.records[0].Name}`);
          }
        });
  });
};

module.exports = {
  getLastAccounts
}
