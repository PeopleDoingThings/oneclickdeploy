var express = require('express');
var router = express.Router();
var SSH2 = require('../ssh2.js');
var Commands = require('../logic/ssh2/commands.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/ssh2'. 

router.get('/startsshpostinstall', function(req, res) {
  req.user = { gitid: 13039425 }; //temp for testing!
  SSH2.runSSHPostInstallSetup(req.user, req.query.repoid)
    .then(function(data) {
      console.log('ssh success = ', data)
      res.send(data);
    })
    .catch(function(err) {
      console.log('ssh err = ', err)
      res.send(err.message);
    })
})

router.get('/reinstallrepo/:instanceid', function(req, res) {
  SSH2.runSSHCommands(req.params.instanceid, Commands.reinstallGitRepo())
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})


module.exports = router;
