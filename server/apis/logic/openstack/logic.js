var OpenStack = require('../../openstack.js');
var Helper = require('./helpers.js');
var Instance = require('../../../database/models/instance.js');
var InstanceDB = require('../../../database/instances.js');
var OVH = require('../../ovh.js');
var Hat = require('hat');
var base64 = require('base-64');

exports.getConsoleOutput = function(id) {
  return Instance.find({ ownergitid: id })
    .then( data => data[0].openstackid )
    .then( data => OpenStack.getConsoleOutput(data) )
}

exports.callCreateNewInstance = function(id) {
  var serverid = '';
  var name = Hat().slice(6);
  var pass = Hat().slice(0, 9);

  return Instance.find({ ownergitid: id })
    .then(function(data) {
      if(data.length > 0) {
        return Promise.reject( new Error('User Already Has An Instance!') );
      }

      return OpenStack.createNewInstance(name, id, pass);
    })
    .then(function(data) {
      if(!data.server) return Promise.reject( new Error(data) )
      serverid = data.server.id
      
      return Helper.insertInstanceLogin({ id: id, name: name, pass: pass });
    })
    .then(function(data) {
      return OVH.getInstance(serverid);
    })
    .then(function(data) {
      console.log('got ins data from OVH = ', data, serverid)
      return InstanceDB.insertUpdateUserInstance(data, id);
    })
}

