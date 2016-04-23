var mongoose = require('mongoose');
var Instance = require('./models/instance.js');
// Set mongoose to use bluebirds promises.
mongoose.Promise = require('bluebird');

exports.getUserInstances = function(gituserid) {
  return Instance.find({ ownergitid: gituserid });
}

exports.getAllInstances = function() {
  return Instance.find({});
}

exports.getInstaceById = function(instanceid) {
  return Instance.find({ openstackid: instanceid });
}