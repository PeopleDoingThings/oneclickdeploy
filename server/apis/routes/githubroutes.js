var express = require('express');
var router = express.Router();
var Github = require('../github.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/github'.

router.get('/repos', function(req, res) {
  console.log('Logged In GitHub User: ', req.user && req.user.login)
  var username = req.user && req.user.login || 'febtek';

  Github.getUserRepos(username)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/validate', function(req, res) {
  
})

router.post('/deploy', function(req, res) {
  Logic.save(resp, String(req.user.gitid))
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err.message);
    })
})


module.exports = router;