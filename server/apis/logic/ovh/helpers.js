var InstanceLogin = require('../../../database/models/instancelogin.js');
var Hat = require('hat');

exports.checkListImage = function(data, version) {
  var result = data
    .filter(val => val.name.toLowerCase().replace(/ /g,'') === version.toLowerCase())[0].id;

  if(result.length > 0) {
    return Promise.resolve(result);
  }
  else {
    return Promise.reject( new Error('OS Name Not Found!') );
  }
}

// We can modify 'vps-ssd-1' here to look for different flavors or add a parameter.
exports.checkFlavorData = function(data) {
  return data
    .filter(val => val.name === "vps-ssd-1")[0].id;
}

// Hard coding our expecatation here. Would want pass as arg in future.
exports.checkInstanceState = function(data) {
  var state = {};
  state.isReady = false;
  state.created = data.created;
  state.status = data.status;
  state.flavorid = data.flavor.id;
  state.imageid = data.image.id
  state.imagename = data.image.name;

  console.log('IP Data = ', data.ipAddresses)

  if(data.ipAddresses !== null) {
    state.ip = {
      ip: data.ipAddresses[0].ip,
      type: data.ipAddresses[0].type
    }
  } else {
    return Promise.reject( new Error('IP Data is not yet avaliable!') )
  }
  

  if( data.status === 'ACTIVE' && 
      data.flavor.id === process.env.OVH_FLAVOR && 
      data.image.id === process.env.OVH_CUSTOMSNAPSHOT )
  {
    state.isReady = true;
  }

  return state;
}



