var express = require('express');
var router = express.Router();
var GITHUB = require('../github.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/github'. 

router.get('/repos', function(req, res) {
  var username = req.user || 'makersquare'

  GITHUB.getUserRepos(username)
  .then(function(resp) {
    res.send(resp);
  })
  .catch(function(err) {
    res.send(err);
  })
})

router.get('/validate')
module.exports = router;