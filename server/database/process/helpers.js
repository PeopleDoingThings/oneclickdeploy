var mongoose = require('mongoose');
var Instance = require('../models/instance.js');
mongoose.Promise = require('bluebird');


exports.saveInstance = function(obj, gitid) {
  var instanceObj = new Instance({
    name: obj.name,
    openstackid: obj.id,
    ownergitid: gitid,
    state: {
      complete: false,
      status: obj.status,
      customimage: false,
      postinstall: false,
      deployedrepos: [],
    },
    creationdate: obj.created,
    publicip: obj.ipAddresses,
    image: {
      flavorid: obj.flavor.id,
      imageid: obj.image.id
    },
    system: {
      disk: obj.flavor.disk,
      region: obj.flavor.region,
      type: obj.flavor.name,
      inboundbandwidth: obj.flavor.inboundBandwidth,
      vcpus: obj.flavor.vcpus,
      ram: obj.flavor.ram
    },
    ssh: {
      user: null,
      pass: null
    },
    region: obj.image.region
  });

  return instanceObj.save();
}

exports.findByInstanceId = function(id) {
  return Instace.findOne( { 'openstackid': id } )
    .then(function(data) {
      if(!data) {
        return Promise.reject( new Error('No User Instance Found!', id) );
      }

      return data;
    })
}

exports.updateInstanceEntry = function(instance) {
  return Instance.findByIdAndUpdate(instance._id,
    { 'state.status': instance.state.status,
      'state.complete': instance.state.complete,
      'state.customimage': instance.state.customimage,
      'state.postinstall': instance.state.postinstall, 
      'postinstall': instance.state.postinstall,
       publicip: instance.publicip,
      'ssh.user': instance.ssh.user,
      'ssh.pass': instance.ssh.pass
    });
}



