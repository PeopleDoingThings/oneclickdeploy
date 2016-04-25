var req = require('request');
var Helpers = require('./logic/ssh2/helpers.js');
var Instance = require('../database/instances.js')
//This methods file includes our logic and isolates it from our API.
var Methods = require('./logic/ssh2/methods.js');
var Commands = require('./logic/ssh2/commands.js');


exports.runSSHPostInstallSetup = function(instanceid, startCommand) {
  return Instance.getInstanceById(instanceid)
    .then(function(data) {
      if(!data) {
        return Promise.reject( new Error('Instance not Found!') );
      }
      else if(data.state.status === 'BUILD') {
        return Promise.reject( new Error('Instance not Ready!') );
      }

      return Methods.runCommandList(data, Commands.postInstallSetup(repoURL, startCommand));
    })
    .then(function(data) {
      return data;
    })
}

exports.runSSHCommands = function(instanceid, cmdArray) {
  return Instance.getInstanceById(instanceid)
    .then(function(data) {
      if(!data) {
        return Promise.reject( new Error('Instance not Found!') );
      }
      else if(data.state.status === 'BUILD') {
        return Promise.reject( new Error('Instance not Ready!') );
      }

      return Methods.runCommandList(data, cmdArray);
    })
    .then(function(data) {
      return data;
    })
}




