var OpenStack = require('../../openstack.js');
var Helper = require('./helpers.js');
var Instance = require('../../../database/models/instance.js');
var Instances = require('../../../database/instances.js');
var OVH = require('../../ovh.js');
var Hat = require('hat');
var base64 = require('base-64');

exports.getConsoleOutput = function(id) {
  return Instance.find({ ownergitid: id })
    .then(function(data) {
      return data[0].openstackid;
    })
    .then(function(data) {
      return OpenStack.getConsoleOutput(data);
    })
}

exports.callCreateNewInstance = function(id) {
  var serverid = '';
  var name = Hat().slice(6);
  var pass = Hat().slice(0, 9);

  return Instances.getUserInstances(id)
    .then(function(data) {
      if(data.length > 0) {
        return Promise.reject( new Error('User Already Has An Instance!') );
      }

      console.log('creating new instance with: ', name, id)
      return OpenStack.createNewInstance(name, id, pass);
    })
    .then(function(data) {
      console.log('serverid = -==== ', data.server.id)
      serverid = data.server.id
      
      return Helper.insertInstanceLogin({ id: id, name: name, pass: pass });
    })
    .then(function(data) {
      console.log('getting instance login data from ovh!', data);
      console.log('using server id = ', serverid)
      return OVH.getInstance(serverid);
    })
    .then(function(data) {
      console.log('got ins data from OVH = ', data, serverid)
      return Instances.insertUpdateUserInstance(data, id);
    })
}

