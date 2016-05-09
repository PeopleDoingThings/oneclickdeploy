var express = require('express');
var router = express.Router();
var OpenStack = require('../openstack.js');
var Logic = require('../logic/openstack/logic.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/openstack'.

router.get('/getflavors', function(req, res) {
  OpenStack.getFlavors()
    .then( data => res.send(data.body) )
    .catch( err => res.send(err) )
})

router.get('/getnewtoken', function(req, res) {
  OpenStack.getNewToken()
    .then( data => res.send(data.body) )
    .catch( err => res.send(err) )
})

router.get('/getconsoleoutput', function(req, res) {
  Logic.getConsoleOutput(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err) )
})

router.get('/createinstance', function(req, res) {
  Logic.callCreateNewInstance(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message) )
})

router.get('/createconsole', function(req, res) {
  Logic.createConsole(req.user.gitid)
    .then( data => res.send(data) )
    .catch( err => res.send(err.message) )
})


module.exports = router;