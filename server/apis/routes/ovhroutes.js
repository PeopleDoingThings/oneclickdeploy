var express = require('express');
var router = express.Router();
var OVH = require('../ovh.js');
var Logic = require('../logic/ovh/logic.js');

// These routes are relative to the mounted router. Therefore '/' here is actually '/api/ovh'. 

// Time ex: 'today' 'lastday' 'lastweek'
// Can request 'mem:used' 'cpu:used' 'net:tx' 'net:rx'
router.get('/usagestatistics', function(req, res) {
	Logic.getInstanceUsage(req.user.gitid, req.query.time, req.query.type)
    .then( data => res.send(data) )
  	.catch( err => res.send(err.message || err) )
})

// Retrieve a list of all active instances & information for each in an Array.
router.get('/listservices', function(req, res) {
	Logic.instanceList(req.user.gitid)
    .then( data => res.send(data) )
  	.catch( err => res.send(err.message || err) )
})

// Returns the flavor id & the image id
router.get('/vpsimageflavor/:version', function(req, res) {
  Logic.imageData(req.params.version)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message || err) )
})

// Type 'hard' or 'soft' & sends back null
router.get('/reboot', function(req, res) {
  Logic.rebootInstance(req.user.gitid, req.query.type)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message || err) )
})

router.get('/reinstall', function(req, res) {
  Logic.reinstallInstance(req.user.gitid)
    .then( data => { // This returns undefined on success. Check for this here otherwise its unclear.
      if(!data) res.send('Instance Reinstall Successful!');
      else res.send(data);
    })
    .catch( err => res.send(err.message) )
})

router.get('/checkinstanceready', function(req, res) {
  Logic.checkReady(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message || err) )
})

router.get('/getconsoleoutput', function(req, res) {
  Logic.getConsoleOutput(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message || err) )
})

router.get('/createbackup', function(req, res) {
  Logic.createBackup(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message || err) )
})

router.get('/getsnapshotstatus', function(req, res) {
  Logic.getSnapShotStatus(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message || err) )
})

router.get('/deletebackup', function(req, res) {
  Logic.deleteBackup(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message || err) )
})

router.get('/listbackups', function(req, res) {
  Logic.getBackups(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message || err) )
})

router.get('/rescuemode/:state', function(req, res) {
  Logic.rescueReboot(req.user.gitid, req.params.state)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message || err) )
})



module.exports = router;