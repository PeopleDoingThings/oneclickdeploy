var mongoose = require('mongoose');
var Instance = require('../models/instance.js');
mongoose.Promise = require('bluebird');


exports.saveInstance = function(obj, gitid) {

  var instanceObj = new Instance({
    name: obj.name,
    openstackid: obj.id,
    ownergitid: gitid,
    region: obj.image.region,
    state: {
      complete: false,
      status: obj.status,
      customimage: false,
      postinstall: false,
      subdomain: 'none'
    },
    creationdate: obj.created,
    publicip: 'pending',
    image: {
      flavorid: obj.flavor.id,
      imageid: obj.image.id
    },
    system: {
      disk: obj.flavor.disk,
      type: obj.flavor.name,
      bandwidth: obj.flavor.inboundBandwidth,
      vcpus: obj.flavor.vcpus,
      ram: obj.flavor.ram
    }
  });

  return instanceObj.save();
}

exports.findByInstanceId = function(id) {
  return Instance.findOne( { 'openstackid': id } )
    .then(function(data) {
      if(!data) {
        return Promise.reject( new Error('No User Instance Found!', id) );
      }

      return data;
    })
}

exports.updateInstanceEntry = function(instance) {
  console.log('updating Instance = ', instance)
  return Instance.findByIdAndUpdate(instance._id,
    {
      state: instance.state,
      publicip: instance.publicip
    });
}

exports.updateInstanceEntryFromOVH = function(insObj, id) {
  console.log('updating instance db after reinstall/helpers.js db = ', insObj, id)
  return Instance.findByIdAndUpdate(id,
    {
      'state.status': insObj.status,
      publicip: insObj.ipAddresses[0].ip,
      'image.imageid':insObj.image.id
    })
}

exports.updateInstanceState = function(obj, id) {
  var insert = {
    state: null,
    publicip: null
  }

  if(obj.isReady) {
    insert.state = 'ACTIVE';
    insert.publicip = obj.ip.ip;
  }

  return Instance.findByIdAndUpdate(id,
    {
      'state.status': insert.state,
      publicip: insert.publicip,
      'state.customimage': true
    });
}
