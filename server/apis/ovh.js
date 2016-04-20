var Promise = require("bluebird");

var ovh = Promise.promisifyall(require('ovh')({
  endpoint: process.env.OVH_ENDPOINT,
  appKey: process.env.OVH_APPKEY,
  appSecret: process.env.OVH_APPSECRET,
  consumerKey: process.env.OVH_CONSUMERKEY
}));

// exports.getMemUsage = function(instanceid, projectid) {
// 	return new Promise(function(resolve, reject) {
// 		ovh.request('GET', '/cloud/project/' + projectid + '/instance/' + iid + '/monitoring?period=lastday&type=mem:used', function (err, resp) {
//   		if(err) {
//   			reject(err);
//   			return;
//   		}

//   		resolve(resp);
// 		});
// 	})
// }

exports.getMemUsage = ovh.request('GET', '/cloud/project/' + projectid + '/instance/' + iid + '/monitoring?period=lastday&type=mem:used');