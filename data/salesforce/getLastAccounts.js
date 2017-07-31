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

        });
    // sendTextMessageWithDelai(senderID, 'Look, I found something for you !');
    if (records[0]) {
      console.log(`The first account name is ${records[0].Name}`);
      sendTextMessageWithDelai(senderID, `The first account name is ${records[0].Name}`);
    }
    else {
      console.log('records length is ' , records.length);
    }
  });
};

module.exports = {
  getLastAccounts
}
