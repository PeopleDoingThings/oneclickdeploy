var req = require('request');

var computeEndpoint = 'https://compute.bhs1.cloud.ovh.net/v2/';
var imageEndpoint = 'https://image.compute.bhs1.cloud.ovh.net/';
var identityEndpoint = 'https://auth.cloud.ovh.net/v2.0';

var tenant_id = process.env.OPENSTACK_TENANTID;
var createOpts = function(url) {
  var opt = {
    url: url,
    headers: {
      'X-Auth-Token': process.env.OPENSTACK_X_AUTH
    }
  };

  return opt;
}


exports.getNewToken = function() {
  return new Promise(function(resolve, reject) {
    var opts = {
      url: identityEndpoint + '/tokens',
      json: {
        auth: {
          tenantName: process.env.OPENSTACK_TENANTNAME,
          passwordCredentials: {
            username: process.env.OPENSTACK_USERNAME,
            password: process.env.OPENSTACK_PASSWORD
          }
        }
      }
    }

    req.post(opts, function(err, res) {
      if(err) {
        reject(err);
        return;
      } 
      else if(res.statusCode !== 200) {
        reject(res.statusMessage);
        return;
      }

      resolve(res);
    })
  })
}

exports.getFlavors = function() {
  return new Promise(function(resolve, reject) {
    req.get(createOpts(computeEndpoint + tenant_id + '/flavors'), function(err, res) {
      if(err) {
        reject(err);
        return;
      }

      resolve(res);
    })
  })
}