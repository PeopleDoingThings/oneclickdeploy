var express = require('express');
var router = express.Router();
var OpenStack = require('../openstack.js');
var Logic = require('../logic/openstack/logic.js');

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
      res.send(data.body);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/getconsoleoutput', function(req, res) {
  Logic.getConsoleOutput(String(req.user.gitid))
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err.message);
    })
})


module.exports = router;