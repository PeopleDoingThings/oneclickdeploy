var UserToken = require('../database/models/usertoken.js');

module.exports = function(req, res, next) {
  // TESTING ONLY
  var requestedUrl = req.protocol + '://' + req.get('Host') + req.url;
  var final = requestedUrl.split('/');
  if(final[final.length - 1] === 'getnewtoken') {
    next();
  }
  else if (req.isAuthenticated()) {
    console.log('AuthUser Valid!')

    req.user.gitid = String(req.user.gitid);
    UserToken.find({ id: req.user.gitid })
      .then(function(data) {
        req.user.AccessToken = data[0].token;
        next();
      })
  } 
  else {
    console.log('AuthUser Invalid!')
    res.sendStatus(401);
  }
}