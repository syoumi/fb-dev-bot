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
    if (!error && response.statusCode == 200) {

      // D'abord il faut convertir le body JSON => Object
      var bodyObj = JSON.parse(body);

      console.log('... Informations abt user retrieved successfully ...');
      console.log('BODY : ' , body);

      // Appel du callback avec les informations necessaire
      callback(bodyObj.first_name, bodyObj.last_name, bodyObj.profile_pic, bodyObj.locale);
    } else {

      console.error('### ERROR WHILE RETRIEVING USER INFOS ###');
      console.error(error);
      console.error('### END ERROR USER INFOS ###');
    }

  });
};

module.exports = {
  getUserInfos
}
