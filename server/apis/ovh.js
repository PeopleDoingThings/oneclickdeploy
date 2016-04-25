var ovh = require('ovh')({
  endpoint: process.env.OVH_ENDPOINT,
  appKey: process.env.OVH_APPKEY,
  appSecret: process.env.OVH_APPSECRET,
  consumerKey: process.env.OVH_CONSUMERKEY
});

exports.getInstanceUsage = function(inst, proj, time, type) {
	return new Promise(function(resolve, reject) {
		ovh.request('GET', `/cloud/project/${process.env.OVH_SERVICEID}/instance/${inst}/monitoring?period=${time}&type=${type}`, function (err, resp) {
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
    ovh.request('GET', '/cloud/project', function (err, resp) {
      if(err) {
        reject(err);
        return;
      }

      resolve(resp);
    });
  })
}

exports.getServiceInformation = function(serviceid) {
  return new Promise(function(resolve, reject) {
    ovh.request('GET', `/cloud/project/${serviceid}`, function (err, resp) {
      if(err) {
        reject(err);
        return;
      }

      resolve(resp);
    });
  })
}

// Hard coding here as we are only interested in the minimum instance size.
exports.getImageIDs = function() {
  return new Promise(function(resolve, reject) {
    ovh.request('GET', `/cloud/project/${process.env.OVH_SERVICEID}/image?flavorType=vps-ssd-1&osType=linux&region=BHS1`, function(err, resp) {
      if(err) {
        reject(err);
        return;
      }

      resolve(resp);
    })
  })
}

exports.getFlavorIDs = function() {
  return new Promise(function(resolve, reject) {
    ovh.request('GET', `/cloud/project/${process.env.OVH_SERVICEID}/flavor?region=BHS1`, function(err, resp) {
      if(err) {
        reject(err);
        return;
      }

      resolve(resp);
    })
  })
}

exports.createNewInstance = function(obj) {
  return new Promise(function(resolve, reject) {
    ovh.request('POST', `/cloud/project/${process.env.OVH_SERVICEID}/instance`, obj, function(err, resp) {
      if(err) {

        console.log('ovh createNewInstance err = ', err)
        reject(err);
        return;
      }

      console.log('ovh createNewInstance resp = ', resp);

      resolve(resp);
    })
  })
}

exports.rebootInstance = function(instanceid) {
  return new Promise(function(resolve, reject) {
    ovh.request('POST', `/cloud/project/${process.env.OVH_SERVICEID}/instance/${instanceid}/reboot`, function(err, resp) {
      if(err) {
        reject(err);
        return;
      }

      resolve(resp);
    })
  })
}

exports.getSnapshots = function() {
  return new Promise(function(resolve, reject) {
    ovh.request('GET', `/cloud/project/${process.env.OVH_SERVICEID}/snapshot`, function(err, resp) {
      if(err) {
        reject(err);
        return;
      }

      resolve(resp);
    })
  })
}

exports.reinstallInstance = function(instanceid, imgObj) {
  return new Promise(function(resolve, reject) {
    ovh.request('POST', `/cloud/project/${process.env.OVH_SERVICEID}/instance/${instanceid}/reinstall`, imgObj, function(err, resp) {
      if(err) {
        reject(err);
        return;
      }

      resolve(resp);
    })
  })
}

exports.getInstance = function(instanceid) {
  return new Promise(function(resolve, reject) {
    ovh.request('GET', `/cloud/project/${process.env.OVH_SERVICEID}/instance/${instanceid}`, function(err, resp) {
      if(err) {
        reject(err);
        return;
      }

      resolve(resp);
    })
  })
}





