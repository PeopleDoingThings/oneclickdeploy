var mongoose = require('mongoose');
var Instance = require('./models/instance.js');
var Helper = require('./process/helpers.js')
mongoose.Promise = require('bluebird');


exports.getUserInstances = function(gituserid) {
  return Instance.find({ ownergitid: gituserid });
}

exports.getAllInstances = function() {
  return Instance.find({});
}

exports.getInstanceById = function(instanceid) {
  return Instance.find({ openstackid: instanceid });
}

// Here if instance doesn't exist it will be from the OVH api (createnew) so its obj.id instead of obj.openstackid
exports.insertUpdateUserInstance = function(obj, gitid) {
  return Helper.findByInstanceId(obj.openstackid)
    .then(function(data) {
      console.log('found instance instances.js/db 23 = ', data)
      return Helper.updateInstanceEntry(data);
    })
    .then(function(data) {
      return data;
    })
    .catch(function(err) {
      console.log('instance not found saving new/instances.js/30: ', err)
      return Helper.saveInstance(obj, gitid);
    })
}

exports.updateInstanceFromReinstall = function(obj, id) {
  return Helper.updateInstanceEntryFromOVH(obj, id);
}

exports.updateInstanceState = function(obj, id) {
  return Helper.updateInstanceState(obj, id)
    .then(function(data) {
      return data;
    })
}
