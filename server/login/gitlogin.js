var express = require('express');
var router = express.Router();

var passportGithub = require('./auth/githubstrategy.js');


// These routes are relative to the mounted router. Therefore '/' here is actaully '/login/'. 
// '/github resolves to '/login/github'
router.get('/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

module.exports = router;