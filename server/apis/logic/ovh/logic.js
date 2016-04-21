var OVH = require('../../ovh.js');
var Helper = require('./helpers.js');

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
    return Helper.checkListImage(data, version);
  })
  .then(function(data) {
    obj.imageid = data[0];
    return OVH.getFlavorIDs();
  })
  .then(function(data) {
    obj.flavorid = Helper.checkFlavorData(data)[0];
    return obj;
  })
  .catch(function(err) {
    console.log('imgflavor err 38: ', err)
    return err;
  })
}


