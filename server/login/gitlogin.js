var express = require('express');
var router = express.Router();
var Instance = require('../database/instances.js');


var passportGithub = require('./auth/githubstrategy.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/login/'. 
// '/github resolves to '/login/github'

//req.isAuthenticated() will return true or false. Then returns the user obj if they are authed.
router.get('/isauthenticated', function(req, res) {
  console.log('req.user === ', req.user)

  if (req.isAuthenticated()) {
    res.send(req.user);
  } 
  else {
    res.sendStatus(401);
  }

});

router.get('/getuserinstances', function(req, res) {
  Instance.getUserInstances(req.user.gitid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
});

router.get('/github', passportGithub.authenticate('github'));

router.get('/github/callback',

  passportGithub.authenticate('github', { failureRedirect: 'http://localhost:9001/failed', successRedirect: '/#/main-panel' }));


module.exports = router;




