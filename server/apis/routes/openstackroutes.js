var express = require('express');
var router = express.Router();
var OpenStack = require('../openstack.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/openstack'. 

router.get('/getflavors', function(req, res) {
  OpenStack.getFlavors()
    .then(function(data) {
      res.send(data.body);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/getnewtoken', function(req, res) {
  OpenStack.getNewToken()
    .then(function(data) {
      process.env.OPENSTACK_X_AUTH = data.body.access.token.id;
      console.log('os id = ', process.env.OPENSTACK_X_AUTH);
      res.send(data.body);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/getconsoleoutput/:instanceid', function(req, res) {
  console.log('console ins id = ', req.params.instanceid)
  OpenStack.getConsoleOutput(req.params.instanceid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})


module.exports = router;