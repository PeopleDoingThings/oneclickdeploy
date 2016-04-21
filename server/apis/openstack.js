var Promise = require('bluebird');
var req = Promise.promisifyAll(require('request'));

var computeEndpoint = 'https://compute.bhs1.cloud.ovh.net/v2/';
var imageEndpoint = 'https://image.compute.bhs1.cloud.ovh.net/';
var identityEndpoint = 'https://auth.cloud.ovh.net/v2.0';

var createOpts = function(url) {
  var opt = {
    url: url,
    headers: {
      'X-Auth-Token': process.env.OPENSTACK_X_AUTH
    }
  };

  return opt;
}

