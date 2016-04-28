var express = require('express');
var router = express.Router();
var Github = require('../github.js');
var Logic = require('../logic/github/logic.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/github'.

router.get('/repos', function(req, res) {
  Github.getUserRepos(req.user, req.query.refresh)  // If refresh !== undefined we refresh all db data.
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err.message);
    })
})



module.exports = router;