var express = require('express');
var router = express.Router();


var passportGithub = require('./auth/githubstrategy.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/login/'. 
// '/github resolves to '/login/github'

//req.isAuthenticated() will return true or false. Then returns the user obj if they are authed.
router.get('/isauthenticated', function(req, res) {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } 
  else {
    res.sendStatus(401);
  }

});

router.get('/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
  passportGithub.authenticate('github', { failureRedirect: 'http://localhost:8080/', successRedirect: 'http://localhost:8080/main-panel' }));




module.exports = router;