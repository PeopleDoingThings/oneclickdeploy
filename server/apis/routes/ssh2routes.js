var express = require('express');
var router = express.Router();
var SSH2 = require('../ssh2.js');
var Commands = require('../ssh2/commands.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/ssh2'. 

router.get('/startsshpostinstall/:instanceid', function(req, res) {
  SSH2.runSSHPostInstallSetup(req.params.instanceid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
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
