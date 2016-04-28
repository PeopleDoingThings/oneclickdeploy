var express = require('express');
var router = express.Router();
var InstanceDB = require('../../database/instances.js');
var Repo = require('../../database/models/deployablerepos.js');


// Protect with middleware later on.
router.get('/getuserinstances', function(req, res) {
  return InstanceDB.getUserInstances(String(req.user.gitid))
    .then( data => res.send(data) )
    .catch( err => res.send(err.message) )
})

router.get('/checkdeployed', function(req, res) {
  return Repo.find({ ownerid: String(req.user.gitid) })
    .then( data => res.send(data) )
    .catch( err => res.send(err) )
})


module.exports = router;