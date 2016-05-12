var Hat = require('hat');
var ovh = require('ovh')({
  endpoint: process.env.OVH_ENDPOINT,
  appKey: process.env.OVH_APPKEY,
  appSecret: process.env.OVH_APPSECRET,
  consumerKey: process.env.OVH_CONSUMERKEY
});

exports.getInstanceUsage = function(inst, time, type) {
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

exports.rebootInstance = function(instanceid, type) {
  return new Promise(function(resolve, reject) {
    ovh.request('POST', `/cloud/project/${process.env.OVH_SERVICEID}/instance/${instanceid}/reboot`, 
      { type: type },
      function(err, resp) {
      if(err) {
        reject(err);
        return;
      }
      else if(resp === null) {
        resolve(`${type} reboot successful!`);
      }
      else {
        reject('Reboot Failed!');
      }
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

      console.log('got instance data from OVH = ', resp)
      resolve(resp);
    })
  })
}

exports.createSnapShot = function(instanceid) {
  return new Promise(function(resolve, reject) {
    var snapshotName = Hat().slice(0, 9);
    ovh.request('POST', `/cloud/project/${process.env.OVH_SERVICEID}/instance/${instanceid}/snapshot`,
      { snapshotName: snapshotName }, 
      function(err, resp) {
        if(err) {
          reject(err);
          return;
        }

        resolve(snapshotName);
    })
  })
}

exports.getSnapShots = function() {
  return new Promise(function(resolve, reject) {
    ovh.request('GET', `/cloud/project/${process.env.OVH_SERVICEID}/snapshot`, function(err, resp) {
      if(err) {
        reject(err);
        return;
      }

      console.log('got snapshot data from OVH = ', resp)
      resolve(resp);
    })
  })
}

exports.deleteSnapShot = function(sid) {
  return new Promise(function(resolve, reject) {
    ovh.request('DELETE', `/cloud/project/${process.env.OVH_SERVICEID}/snapshot/${sid}`, function(err, resp) {
      if(err) {
        reject(err);
        return;
      }

      console.log('deleted snapshot ovh = ', resp)
      resolve(resp);
    })
  })
}

exports.rescueReboot = function(instanceid, state) {
  state = JSON.parse(state);
  return new Promise(function(resolve, reject) {
    ovh.request('POST', `/cloud/project/${process.env.OVH_SERVICEID}/instance/${instanceid}/rescueMode`,
      { rescue: state },
      function(err, resp) {
        if(err) {
          reject(err);
          return;
        }

        resolve(resp);
    })
  })
}

exports.getSnapShotStatus = function(snapshotId) {
  return new Promise(function(resolve, reject) {
    ovh.request('GET', `/cloud/project/${process.env.OVH_SERVICEID}/snapshot/${snapshotId}`, function(err, resp) {
      if(err) {
        reject(err);
        return;
      }

      resolve(resp);
    })
  })
}


