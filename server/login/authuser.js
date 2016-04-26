module.exports = function(res, req, next) {
  if (req.isAuthenticated()) {
    console.log('User: ', req.user.name);
    next();
  } 
  else {
    res.sendStatus(401);
  }
}