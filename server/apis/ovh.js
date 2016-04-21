var ovh = require('ovh')({
  endpoint: process.env.OVH_ENDPOINT,
  appKey: process.env.OVH_APPKEY,
  appSecret: process.env.OVH_APPSECRET,
  consumerKey: process.env.OVH_CONSUMERKEY
});

exports.getInstanceUsage = function(inst, proj, time, type) {
	return new Promise(function(resolve, reject) {
		ovh.request('GET', '/cloud/project/' + proj + '/instance/' + inst + '/monitoring?period=' + time + '&type=' + type, function (err, resp) {
  		if(err) {
  			reject(err);
  			return;
  		}

  		resolve(resp);
	  });
  })
}

exports.listServices = function() {
  return new Promise(function(resolve, reject) {
    ovh.request('GET', '/cloud', function (err, resp) {
      if(err) {
        reject(err);
        return;
      }

      resolve(resp);
    });
  })
}