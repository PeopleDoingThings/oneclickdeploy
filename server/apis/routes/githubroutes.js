var express = require('express');
var router = express.Router();
var Github = require('../github.js');
var Logic = require('../logic/github/logic.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/github'.

router.get('/repos', function(req, res) {
  var username = req.user && req.user.login;

  Github.getUserRepos(username)
    .then(function(resp) {
      return Logic.save(String(req.user.gitid), resp);
    })
    .then(function(data) {
      res.send(resp);
    })
    .catch(function(err) {
      res.send(err.message);
    })
})



module.exports = router;