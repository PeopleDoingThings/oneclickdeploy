var express = require('express');
var router = express.Router();
var OVH = require('../ovh.js');

// These routes are relative to the mounted router. Therefore '/' here is actually '/api/ovh'. 

var projectid = '614a903725ef470e8784b48758da23ad';
var iid = '5dd13a9d-9d45-48d8-9a9a-04ab739d7623';

router.get('/data', function(req, res) {
	OVH.getMemUsage(iid, projectid).then(function(resp) {
		res.send(resp);
	})
	.catch(function(err) {
		console.log('errr gettig mee usage = ', err)
		res.send(err);
	})
})






module.exports = router;