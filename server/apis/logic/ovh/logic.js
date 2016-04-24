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
  .catch(function(err) {
    console.log('imgflavor err 38: ', err)
    return err;
  })
}

// Helper is a syncronous function but we return a promise for consistency.
// We get back an obj that has an 'id' as prop of the obj. We can use this to check for deployment & retrieve ssh keys.
exports.createInstance = function(flav, img, name, pass, requser) {
  return Helper.createInstanceObj(flav, img, name, pass)
    .then(function(reqObj) {
      return OVH.createNewInstance(reqObj);
    })
    .then(function(data) {
      return Instance.insertUpdateUserInstance(data, requser.id);
    })
}

// Hard coded our custom snapshot id.
exports.reinstallInstance = function(instanceid) {
  var imgObj = { imageId: process.env.OVH_CUSTOMSNAPSHOT };
  return OVH.reinstallInstance(instanceid, imgObj);
}

exports.checkReady = function(instanceid) {
  return OVH.getInstance(instanceid).then(function(data) {
    return Helper.checkInstanceState(data);
  })
  .then(function(data) {
    return data;
  })
  .catch(function(err) {
    console.log('ovh logic 64 err: ', err)
    return err;
  })
}
