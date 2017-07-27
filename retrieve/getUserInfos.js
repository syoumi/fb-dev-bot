// Ce fichier est responsable de l'extraction des informations sur l'utilisateur

const request = require('request');

const {FB_PAGE_TOKEN} = require('./../include/config');

var getUserInfos = (userID, callback) => {
  request({
    uri: `https://graph.facebook.com/v2.6/${userID}`,
    qs: {
      fields: 'first_name,last_name,profile_pic,locale,timezone,gender',
      access_token: FB_PAGE_TOKEN
    },
    method: 'GET'
  }, (error, response, body) => {
    console.log('###TEST1');
    if (!error && response.statusCode == 200) {
      console.log('###TEST2');

      console.log('... Informations abt user retrieved successfully ...');
      console.log('BODY : ' , body);
      callback(response.first_name, body.last_name, body.profile_pic, body.locale);
    } else {
      console.log('###TEST3');

      console.error('### ERROR WHILE RETRIEVING USER INFOS ###');
      console.error(error);
      console.error('### END ERROR USER INFOS ###');
    }
    console.log('###TEST4');

  });
};

module.exports = {
  getUserInfos
}
