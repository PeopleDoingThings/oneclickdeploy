var express = require('express');
var router = express.Router();
var Repo = require('../../database/models/deployablerepos.js');


// Base route is /api/daemon/
router.get('/stats/:command', function(req, res) {
  Logic.getCommandData(req.user.gitid, req.params.command)
    .then( data => res.send(data) )
    .catch( err => res.send(err) )
})

// Checks the daemon is online & responding. If its not will do as below.
// If query restart=soft will attempt to restart the daemon through ssh.
// If query restart=hard will reinstall the daemon.
router.get('/daemonhealth', function(req, res) {
  Logic.checkDaemonHealth(req.user.gitid, req.query.restart)
    .then( data => res.send(data) )
    .catch( err => res.send(err) )
})


module.exports = router;