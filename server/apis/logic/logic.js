var OVH = require('../ovh.js');

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
  return OVH.getImageIDs(version).then(function(data) {
    var result = '';

    data.forEach(function(val) {
      if(val.name.toLowerCase().replace(/ /g,'') === version.toLowerCase()) {
        // result = val.id;
        console.log('hi')
      }
    })

    if(result.length > 0) {
      return result;
    }
    else {
      return Promise.reject( new Error('OS Name Not Found!') );
    }
  })
}