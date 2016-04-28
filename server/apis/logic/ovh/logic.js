var OVH = require('../../ovh.js');
var Helper = require('./helpers.js');
var InstanceDB = require('../../../database/instances.js');
var InstanceLogin = require('../../../database/instancelogin.js');
var OpenStack = require('../../openstack.js');
var Hat = require('hat');


// This maps each service to a list of its information
exports.instanceList = function() {
  return OVH.listServices()
  .then( data => data )
  .then( data => Promise.all( resp.map( val => OVH.getServiceInformation(val)) ))
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

  return InstanceDB.getUserInstances(id)
    .then(function(data) {
      mongoInstanceId = data[0]._id;
      console.log('found instance for reinstall! = ', data, 'ins id = ', data[0].openstackid);
      return OVH.reinstallInstance(data[0].openstackid, imgObj);
    })
    .then(function(data) {
      console.log('reinstalled instance = ', data, mongoInstanceId)
      return InstanceDB.updateInstanceFromReinstall(data, mongoInstanceId);
    })
}

exports.checkReady = function(userid) {
  var mongoInstanceId = '';
  return InstanceDB.getUserInstances(userid) // Making sure there is an instance connected with this user.
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
      console.log('DATA IP IS THIS UNDEFINED???? ==== ', data)
      InstanceDB.updateInstanceState(data, mongoInstanceId) // We update instancelogin data with the ip to complete this dataset.
        .then( obj => InstanceLogin.findAndUpdateIP(userid, data.ip.ip) )

      return data;
    })
}

// Can Refactor these four when time permits.
exports.rebootInstance = function(userid, type) {
  return InstanceDB.getUserInstances(userid)
    .then( data => OVH.rebootInstance(data[0].openstackid, type) )
}

exports.getInstanceUsage = function(userid, time, type) {
  return InstanceDB.getUserInstances(userid)
    .then( data => OVH.getInstanceUsage(data[0].openstackid, time, type) )
}

exports.getConsoleOutput = function(userid) {
  return InstanceDB.getUserInstances(userid)
    .then( data => OpenStack.getConsoleOutput(data[0].openstackid) )
}

exports.getSSHKey = function(userid) {
  return InstanceDB.getUserInstances(userid)
    .then( data => OVH.getSSHKey(data[0].openstackid) )
}

