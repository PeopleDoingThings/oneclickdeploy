var express = require('express');
var router = express.Router();
var SSH2 = require('../ssh2.js');
var Commands = require('../logic/ssh2/commands.js');


// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/ssh2'. 
router.get('/startsshpostinstall', function(req, res) {
  SSH2.runSSHPostInstallSetup(req.user, req.query.repoid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message) )
})

router.get('/reinstallrepo', function(req, res) {
  SSH2.runSSHCommands(req.user.gitid, Commands.reinstallGitRepo())
    .then( data => res.send(data) )
    .catch( err => res.send(err.message) )
})


module.exports = router;
