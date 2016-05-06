var UserToken = require('../database/models/usertoken.js');

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
        next();
      })
  } 
  else {
    console.log('AuthUser Invalid!')
    res.sendStatus(401);
  }
}
