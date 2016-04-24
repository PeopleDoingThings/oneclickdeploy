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

exports.getInstaceById = function(instanceid) {
  return Instance.find({ openstackid: instanceid });
}

// Here if instance doesn't exist it will be from the OVH api (createnew) so its obj.id instead of obj.openstackid
exports.insertUpdateUserInstance = function(obj, gitid) {
  return Helper.findByInstaceId(obj.openstackid)
    .then(function(data) {
      return Helper.updateInstanceEntry(data);
    })
    .then(function(data) {
      return data;
    })
    .catch(function(err) {
      Helper.saveInstance(obj.id, gitid)
        .then(function(data) {
          return data;
        })
        .catch(function(err) {
          return data;
        })
    })

}


