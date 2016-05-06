var Helper = require('./logic/daemon/helper.js');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);


exports.getCommandData = function(data, command) {
  console.log('Getting Command Data: ', data, command)
  return request(Helper.commandObj(data, command));
}

exports.pingDaemon = function(data) {
  return request(Helper.pingObj(data));
}