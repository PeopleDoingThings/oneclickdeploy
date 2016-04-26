var express = require('express');
var router = express.Router();
var Instance = require('../../database/instances');
var Repo = require('../../database/models/deployedrepos.js');


// Protect with middleware later on.
router.get('/getuserinstances', function(req, res) {
  return Instance.getUserInstances(req.user.gitid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err.message);
    })
})

router.get('/checkdeployed', function(req, res) {
  return Repo.find({ ownerid: String(req.user.gitid) })
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})


module.exports = router;