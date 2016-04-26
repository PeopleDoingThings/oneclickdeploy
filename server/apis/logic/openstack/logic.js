var OpenStack = require('../../openstack.js');
var Helper = require('./helpers.js');
var Instance = require('../../../database/models/instance.js');

exports.getConsoleOutput = function(id) {
  return Instance.find({ ownergitid: id })
    .then(function(data) {
      return data[0].openstackid;
    })
    .then(function(data) {
      return OpenStack.getConsoleOutput(data);
    })
}