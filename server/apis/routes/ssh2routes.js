var express = require('express');
var router = express.Router();
var SSH2 = require('../ssh2.js');

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


module.exports = router;