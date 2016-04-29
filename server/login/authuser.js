module.exports = function(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    req.user.gitid = String(req.user.gitid);
    console.log('AuthUser Valid!')
    next();
  } 
  else {
    console.log('AuthUser Invalid!')
    res.sendStatus(401);
  }
}