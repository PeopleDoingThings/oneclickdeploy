var UserToken = require('../database/models/usertoken.js');
var Moment = require('moment')();
var Global = require('../globals/globals.js');
var Openstack = require('../apis/openstack.js');

module.exports = function(req, res, next) {

  // TESTING ONLY
  var requestedUrl = req.protocol + '://' + req.get('Host') + req.url;
  var final = requestedUrl.split('/');
  if(final[final.length - 1] === 'getnewtoken') {
    if(process.env.ENV === 'production') {
      res.sendStatus(401);
    } else {
      next();
    }
  }
  else if (req.isAuthenticated()) {
    console.log('AuthUser Valid!')
    req.user.gitid = String(req.user.gitid);

    UserToken.find({ id: req.user.gitid })
      .then(function(data) {
        if(data.length !== 0) req.user.AccessToken = data[0].token;  // We add this here so it skips the /login/isauth route so the client doesnt get the token.

        if( process.env.NODE_ENV === 'production' ) {
          if(Global.find && (!Global.tokenAge || Moment.diff(Global.tokenAge, 'hours') > 4)) {
          // Set global.find to false as this middleware is called many times.
          Global.find = false; 

          console.log('getting new openstack Token!')

          Openstack.getNewToken()
            .then(function(data) {

              // Now we have a new token set our token age && set find to true so we can check in future.
              process.env.OPENSTACK_X_AUTH = data.body.access.token.id;
              console.log('Set Openstack Token: ', process.env.OPENSTACK_X_AUTH)
              Global.tokenAge = Date.now();
              Global.find = true;
              next();

            })
            .catch(function(err) {
              Global.find = true;
              res.sendStatus(401);
            })
          } else {
            next();
          }
        }
        else {
          console.log('Openstack Token Already Valid')
          next();
        }

    })
  } 
  else {
    console.log('AuthUser Invalid!')
    res.sendStatus(401);
  }
}


