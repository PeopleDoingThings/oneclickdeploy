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
  Logic.getConsoleOutput(String(req.user.gitid))
    .then( data => res.send(data) )
    .catch( err => res.send(err) )
})

router.get('/createinstance', function(req, res) {
  Logic.callCreateNewInstance(String(req.user.gitid))
    .then(function(data) {
      console.log('OS create instance success = ', data)
      res.send(data);
    })
    .catch(function(err) {
      console.log('OS create instance err = ', err)
      res.send(err.message)
    })
})


module.exports = router;