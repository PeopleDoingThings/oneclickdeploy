var express = require('express');
var router = express.Router();
var SSH2 = require('../ssh2.js');
var Commands = require('../logic/ssh2/commands.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/ssh2'. 

router.get('/startsshpostinstall', function(req, res) {
  SSH2.runSSHPostInstallSetup(req.user, req.query.repoid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err.message);
    })
})

router.get('/reinstallrepo', function(req, res) {  // Need to remove the instance id here!
  SSH2.runSSHCommands(String(req.user.gitid), Commands.reinstallGitRepo())
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})


module.exports = router;
