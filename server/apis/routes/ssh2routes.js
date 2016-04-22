var express = require('express');
var router = express.Router();
var SSH2 = require('../ssh2.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/ssh2'. 

router.get('/startsshsession/:instanceid', function(req, res) {
  
})


module.exports = router;