var req = require('request');
var Helpers = require('./logic/openstack/helpers.js');

exports.getNewToken = function() {
  return new Promise(function(resolve, reject) {

    req.post(Helpers.tokenOpts, function(err, res) {
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
    req.get(Helpers.createOpts(Helpers.computeEndpoint + Helpers.tenant_id + '/flavors'), function(err, res) {
      if(err) {
        reject(err);
        return;
      }

      resolve(res);
    })
  })
}

exports.getConsoleOutput = function(serverid) {
  return new Promise(function(resolve, reject) {
    req.post(Helpers.createConsoleOpts(serverid), function(err, res) {
      if(err) {
        reject(err);
        return;
      }

      resolve(res.body);
    })
  })
};




