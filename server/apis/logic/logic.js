var OVH = require('../ovh.js');

exports.instanceList = function() {
	return OVH.listServices().then(function(resp) {
		return resp;
	})
	.then(function(resp) {
		return Promise.all(resp.map(function(val) {
			return OVH.getServiceInformation(val);
		}));
	})
}