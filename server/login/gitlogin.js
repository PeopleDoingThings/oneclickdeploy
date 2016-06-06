var express = require('express');
var router = express.Router();
var InstanceDB = require('../database/instances.js');
var passportGithub = require('./auth/githubstrategy.js');
var Repo = require('../database/models/deployablerepos.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/login/'. 
// '/github resolves to '/login/github'

//req.isAuthenticated() will return true or false. Then returns the user obj if they are authed.
router.get('/isauthenticated', function(req, res) {
  if (req.user) console.log('Current User: ', req.user.name);
  if (req.isAuthenticated()) res.send(req.user);
  else res.sendStatus(401);
});

router.get('/getuserinstances', function(req, res) {
  InstanceDB.getUserInstances(String(req.user.gitid))
    .then( data => res.send(data) )
    .catch( err => res.send(err.message) )
});

router.get('/github', passportGithub.authenticate('github', { scope: ['read:org', 'public_repo', 'user'] }));

router.get('/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/#/'}),
    function(req, res) {
      Repo.find({ ownerid: req.user.gitid, deployed: true })
        .then(function(data) {
          if(data.length === 0) {
            res.redirect('/#/first-launch')
          } else {
            res.redirect('/#/dashboard')
          }
        })
        .catch(function(err) {
          res.redirect('/#/first-launch')
        })

    });

module.exports = router;
  