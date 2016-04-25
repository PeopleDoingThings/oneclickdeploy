var req = require('request');
var Helpers = require('./logic/ssh2/helpers.js');
var Instance = require('../database/instances.js')
//This methods file includes our logic and isolates it from our API.
var Methods = require('../ssh2/methods.js');
var Commands = require('../ssh2/dblists/commands.js');


exports.runSSHPostInstallSetup = function(instanceid, cmdArray) {
  return Instance.getInstanceById(instanceid)
    .then(function(data) {
      return Methods.runCommandList(data, cmdArray);
    })
    .then(function(data) {
      return data;
    })
    .catch(function(err) {
      return err;
    })

}