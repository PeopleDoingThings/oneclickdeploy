var express = require('express');
var router = express.Router();
var OVH = require('../ovh.js');
var Logic = require('../logic/ovh/logic.js');

// These routes are relative to the mounted router. Therefore '/' here is actually '/api/ovh'. 

// Time ex: 'today' 'lastday' 'lastweek'
// Can request 'mem:used' 'cpu:used' 'net:tx' 'net:rx'
router.get('/usagestatistics', function(req, res) {
	Logic.getInstanceUsage(String(req.user), req.query.time, req.query.type)
    .then(function(resp) {
  		res.send(resp);
  	})
  	.catch(function(err) {
  		res.send(err);
  	})
})

// Retrieve a list of all active instances & information for each in an Array.
router.get('/listservices', function(req, res) {
	Logic.instanceList()
    .then(function(data) {
  		res.send(data);
  	})
  	.catch(function(err) {
  		res.send(err);
  	})
})

// Returns the flavor id & the image id
router.get('/vpsimageflavor/:version', function(req, res) {
  Logic.imageData(req.params.version)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err.message);
    })
})

// Need to customize this to user. Send 'name' & 'password' as querystring!
router.get('/createinstance/:name', function(req, res) {
  Logic.createInstance(req.params.name, String(req.user.gitid))
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err.message);
    })
})

router.get('/getsshkey', function(req, res) {
  Logic.getSSHKey(String(req.user.gitid))
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/reboot', function(req, res) {
  Logic.rebootInstance(String(req.user.gitid))
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      res.send(err.message)
    })
})

router.get('/getsnapshots', function(req, res) {
  OVH.getSnapshots()
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/reinstall', function(req, res) {
  Logic.reinstallInstance(req.user.gitid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/checkinstanceready', function(req, res) {
  Logic.checkReady(String(req.user.gitid))
    .then(function(data) {
      res.send(data);
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
      res.send(err);
    })
})



module.exports = router;