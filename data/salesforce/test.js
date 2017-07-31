// This file is for testing JSForce library's fonctionnality

const jsforce = require('jsforce');

const {SF_LOGIN} = require('./../../include/config');
const {SF_PASSWORD} = require('./../../include/config');

var link = new jsforce.Connection({
  // optionnal
  // We can change the login URL to sandbox or prerelease env.
  loginUrl: 'https://test.salesforce.com'
});

// We make a new connection using our salesforce credentials
link.login(SF_LOGIN, SF_PASSWORD, (err, userInfo) => {
  if (err) {
    // If there is any errors while connecting to SF, log the event and stop
    return console.error('And error has occured while connecting to SF.', err);
  }

  // We can pick up accessToken and instanceUrl to make our
  // next connexions whitout using login and password
  var accessToken = link.accessToken;
  var instanceUrl = link.instanceUrl;
  // Getting logged in user properties
  var userId = userInfo.id;
  var orgId = userInfo.organizationId;
  // We just log those infos for testing
  console.log('Connection established ..');
  console.log(`Access token ${accessToken}`);
  console.log(`Instance url ${instanceUrl}`);
  console.log(`User ID ${userId}`);
  console.log(`Org ID ${orgId}`);
  // ...
});

link.logout((err) => {
  if (err) {
    return console.error('Error occured while loggin out');
  }
  console.log('Logged out successfully');
});
