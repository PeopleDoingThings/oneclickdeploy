module.exports = function(req, res, next) {
  // TESTING ONLY
  var requestedUrl = req.protocol + '://' + req.get('Host') + req.url;
  var final = requestedUrl.split('/');
  if(final[final.length - 1] === 'getnewtoken') {
    next();
  }
  else if (req.isAuthenticated()) {
    req.user.gitid = String(req.user.gitid);
    console.log('AuthUser Valid!')
    next();
  } 
  else {
    console.log('AuthUser Invalid!')
    res.sendStatus(401);
  }
}