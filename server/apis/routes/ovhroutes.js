var express = require('express');
var router = express.Router();
var OVH = require('../ovh.js');
var Logic = require('../logic/ovh/logic.js');

// These routes are relative to the mounted router. Therefore '/' here is actually '/api/ovh'. 

// Time ex: 'today' 'lastday' 'lastweek'
// Can request 'mem:used' 'cpu:used' 'net:tx' 'net:rx'
router.get('/usagestatistics/:instanceid/:projectid', function(req, res) {
	OVH.getInstanceUsage(req.params.instanceid, req.query.time, req.query.type)
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
router.get('/createinstance/:flavor/:image', function(req, res) {
  Logic.createInstance(req.params.flavor, req.params.image, req.query.name, req.query.password, req.user)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/getsshkey/:instanceid', function(req, res) {
  OVH.getSSHKey(req.params.instanceid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

// Need to customize this to user. Send 'name' & 'password' as querystring!
router.get('/createinstance/:flavor/:image', function(req, res) {
  Logic.createInstance(req.params.flavor, req.params.image, req.query.name, req.query.password)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/getsshkey/:instanceid', function(req, res) {
  OVH.getSSHKey(req.params.instanceid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/reboot/:instanceid', function(req, res) {
  OVH.rebootInstance(req.params.instanceid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
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

router.get('/reinstall/:instanceid', function(req, res) {
  Logic.reinstallInstance(req.params.instanceid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/checkinstanceready/:instanceid', function(req, res) {
  Logic.checkReady(req.params.instanceid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/getconsoleoutput/:instanceid', function(req, res) {
  Logic.getConsoleOutput(req.params.instanceid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

module.exports = router;