var express = require('express');
var router = express.Router();
var InstanceDB = require('../../database/instances.js');
var Repo = require('../../database/models/deployablerepos.js');
var InstanceLoginDB = require('../../database/instancelogin.js');

// Protect with middleware later on.
router.get('/getuserinstances', function(req, res) {
  InstanceDB.getUserInstances(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message) )
})

// This just pulls down any deployed repos for that person.
router.get('/checkdeployed', function(req, res) {
  Repo.find({ ownerid: req.user.gitid, repoid: req.query.repoid })
    .then( data =>  {
      if(data.length === 0) res.send('RepoID Invalid or Repo does not exist!')
      else res.send(data)
    })
    .catch( err => res.send(err) )
})

router.get('/instancelogin', function(req, res) {
  InstanceLoginDB.findInstanceLogin(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err) )
})


module.exports = router;