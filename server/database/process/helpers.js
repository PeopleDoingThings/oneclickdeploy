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
      postinstall: false
    },
    creationdate: obj.created,
    publicip: 'none',
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
    },
    ssh: {
      user: 'none',
      pass: 'none'
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
  return Instance.findByIdAndUpdate(instance._id,
    {
      state: instance.state,
      publicip: instance.publicip,
      ssh: instance.ssh
    });
}

exports.updateInstanceEntryFromOVH = function(insObj, id) {
  return Instance.findByIdAndUpdate(id,
    {
      'state.status': insObj.state.status,
      publicip: insObj.ipAddresses.ip
    });
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
