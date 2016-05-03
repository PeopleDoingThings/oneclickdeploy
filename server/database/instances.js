var mongoose = require('mongoose');
var Instance = require('./models/instance.js');
var Helper = require('./process/helpers.js')
mongoose.Promise = require('bluebird');


// We make sure we get a user Instance here otherwise we reject! This cleans up logic in other files and prevents repition.
exports.getUserInstances = gituserid => Instance.find({ ownergitid: gituserid });

exports.getInstanceById = instanceid => Instance.find({ openstackid: instanceid });

// Here if instance doesn't exist it will be from the OVH api (createnew) so its obj.id instead of obj.openstackid
exports.insertUpdateUserInstance = function(obj, gitid) {
  return Helper.findByInstanceId(obj.openstackid)
    .then( data => {
      return Helper.updateInstanceEntry(data);
    })
    .then( data => data )
    .catch( err => {
      console.log('instance not found saving new/instances.js/30: ', err)
      return Helper.saveInstance(obj, gitid);
    })
}

exports.updateInstanceFromReinstall = (obj, id) => Helper.updateInstanceEntryFromOVH(obj, id);

exports.updateInstanceState = function(obj, id) {
  return Helper.updateInstanceState(obj, id)
    .then( data => data )
}
