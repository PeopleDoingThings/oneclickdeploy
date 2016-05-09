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

router.get('/updatefromgithub', function(req, res) {
  SSH2.updateRepoFromMaster(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message) )
})

router.post('/setenv/:repoid', function(req, res) {
  SSH2.setEnv(req.body, req.params.repoid, req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message) )
})

router.get('/deletedeployedrepo', function(req, res) {
  SSH2.deleteDeployedRepo(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message) )
})

router.get('/getenv/:repoid', function(req, res) {
  SSH2.getEnv(req.params.repoid, req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message) )
})

router.get('/createsubdomain/:subdomain', function(req, res) {
  SSH2.createSubDomain(req.user.gitid, req.params.subdomain)
    .then( data => res.send(data) )
    .catch( err => res.send(err) )
})

router.get('/startforever', function(req, res) {
  SSH2.restartJS(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message) )
})

module.exports = router;
