var express = require('express');
var router = express.Router();
var OVH = require('../ovh.js');

// These routes are relative to the mounted router. Therefore '/' here is actually '/api/ovh'. 

//example ids.
var projectid = '614a903725ef470e8784b48758da23ad';
var insid = '5dd13a9d-9d45-48d8-9a9a-04ab739d7623';


// Time ex: 'today' 'lastday' 'lastweek'
// Can request 'mem:used' 'cpu:used' 'net:tx' 'net:rx'
router.get('/usagestatistics', function(req, res) {
	// Likely want to add req.query insid & proj id etc.
	OVH.getInstanceUsage(insid, projectid, req.query.time, req.query.type).then(function(resp) {
		res.send(resp);
	})
	.catch(function(err) {
		res.send(err);
	})
})

router.get('/listservices', function(req, res) {
	// List avaliable instances/cloud projects
	OVH.listServices().then(function(resp) {
		res.send(resp);
	})
	.catch(function(err) {
		res.send(err);
	})
})


module.exports = router;