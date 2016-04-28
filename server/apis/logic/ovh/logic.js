var OVH = require('../../ovh.js');
var Helper = require('./helpers.js');
var Instance = require('../../../database/instances.js');
var InstanceLogin = require('../../../database/instancelogin.js');
var OpenStack = require('../../openstack.js');
var Hat = require('hat');


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

// Hard coded our custom snapshot id.
exports.reinstallInstance = function(id) {
  var imgObj = { imageId: process.env.OVH_CUSTOMSNAPSHOT };
  var mongoInstanceId = '';

  return Instance.getUserInstances(id)
    .then(function(data) {
      mongoInstanceId = data[0]._id;
      console.log('found instance for reinstall! = ', data, 'ins id = ', data[0].openstackid);
      return OVH.reinstallInstance(data[0].openstackid, imgObj);
    })
    .then(function(data) {
      console.log('reinstalled instance = ', data, mongoInstanceId)
      return Instance.updateInstanceFromReinstall(data, mongoInstanceId);
    })
}

exports.checkReady = function(userid) {
  var mongoInstanceId = '';
  return Instance.getUserInstances(userid) // Making sure there is an instance connected with this user.
    .then(function(data) {
      mongoInstanceId = data[0]._id;
      console.log('mongoInstanceId = ', mongoInstanceId)
      return OVH.getInstance(data[0].openstackid); // finding from internet here in case state changed.
    })
    .then(function(data) {
      console.log('got ovh ins data on check ready! = ', data)
      if(!data) {
        return Promise.reject( new Error('Instance Still Provisioning, Please Try Again!') )
      }

      return Helper.checkInstanceState(data);
    })
    .then(function(data) {
      Instance.updateInstanceState(data, mongoInstanceId) // We update instancelogin data with the ip to complete this dataset.
        .then(function(insert) {
          return InstanceLogin.findAndUpdateIP(userid, data.ip.ip);
        })

      return data;
    })
}

// Can Refactor these four when time permits.
exports.rebootInstance = function(userid, type) {
  return Instance.getUserInstances(userid)
    .then(function(data) {
      return OVH.rebootInstance(data[0].openstackid, type);
    })
}

exports.getInstanceUsage = function(userid, time, type) {
  return Instance.getUserInstances(userid)
    .then(function(data) {
      return OVH.getInstanceUsage(data[0].openstackid, time, type);
    })
}

exports.getConsoleOutput = function(userid) {
  return Instance.getUserInstances(userid)
    .then(function(data) {
      return OpenStack.getConsoleOutput(data[0].openstackid);
    })
}

exports.getSSHKey = function(userid) {
  return Instance.getUserInstances(userid)
    .then(function(data) {
      return OVH.getSSHKey(data[0].openstackid);
    })
}

