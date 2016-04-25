var OVH = require('../../ovh.js');
var Helper = require('./helpers.js');
var Instance = require('../../../database/instances.js');


// This maps each service to a list of its information
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

exports.imageData = function(version) {
var obj = {
  imageid: undefined,
  flavorid: undefined
}

  return OVH.getImageIDs(version)
  .then(function(data) {
    console.log(data);
    return Helper.checkListImage(data, version);
  })
  .then(function(data) {
    obj.imageid = data;
    return OVH.getFlavorIDs();
  })
  .then(function(data) {
    obj.flavorid = Helper.checkFlavorData(data);
    return obj;
  })
}

// Helper is a syncronous function but we return a promise for consistency.
// We get back an obj that has an 'id' as prop of the obj. We can use this to check for deployment & retrieve ssh keys.
exports.createInstance = function(name, id) {
  return Instance.getUserInstances(id)
    .then(function(data) {
      if(data) {
        return Promise.reject( new Error('User Already Has An Instance!') );
      }

      return Helper.createInstanceObj(name, id);
    })
    .then(function(reqObj) {
      return OVH.createNewInstance(reqObj);
    })
    .then(function(data) {
      return Instance.insertUpdateUserInstance(data, id);
    })
}

// Hard coded our custom snapshot id.
exports.reinstallInstance = function(instanceid) {
  var imgObj = { imageId: process.env.OVH_CUSTOMSNAPSHOT };

  return Instance.getUserInstances(id)
    .then(function(data) {
      console.log('found instance for reinstall! = ', data, 'ins id = ', data.openstackid);
      return OVH.reinstallInstance(data.openstackid, imgObj);
    })
    .then(function(data) {
      return Instance.insertUpdateUserInstance;
    })
}

exports.checkReady = function(instanceid) {
  return OVH.getInstance(instanceid).then(function(data) {
    return Helper.checkInstanceState(data);
  })
  .then(function(data) {
    return data;
  })
}

exports.rebootInstance = function(user) {
  Instance.getUserInstances(user.gitid)
    .then(function(data) {
      console.log('rebooting ins: ', data.openstackid)
      return OVH.rebootInstance(data.openstackid);
    })
}

exports.getInstanceUsage = function(user, time, type) {
  Instance.getUserInstances(user.gitid)
    .then(function(data) {
      return OVH.getInstanceUsage(data.openstackid, time, type);
    })
}


