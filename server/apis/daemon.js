var Helper = require('./logic/daemon/helper.js');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);


exports.getCommandData = function(data, command) {
  return request(Helper.commandObj(data, command));
}

exports.pingDaemon = function(data) {
  return request(Helper.pingObj(data));
}