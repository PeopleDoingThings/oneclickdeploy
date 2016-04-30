var req = require('request');
var Helpers = require('./logic/ssh2/helpers.js');
var InstanceDB = require('../database/instances.js');
var Instance = require('../database/models/instance.js');
var Logic = require('./logic/ssh2/logic.js');
var Commands = require('./logic/ssh2/commands.js');
var Repo = require('../database/models/deployablerepos.js');
var InstanceLogin = require('../database/models/instancelogin.js');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);


// Body should contain start command / repo url & name of server file
exports.runSSHPostInstallSetup = function(user, repoid) {
  var instanceData = {};
  if(!repoid) { return Promise.reject( new Error('Please Include a Repo to Provision!') ) }

  return InstanceDB.getUserInstances(user.gitid)
    .then( data => {
      if(data.length === 0) return Promise.reject( new Error('Please First Create an Instance!') )
      return data[0].openstackid 
    })
    .then( data => Instance.find({ openstackid: data }) )
    .then(function(data) {
      console.log('got instance ssh2.js 19 = ', data[0])
      instanceData = data[0];
      if(data.length === 0) {
        return Promise.reject( new Error('Instance not Found!') );
      }
      else if(data[0].state.status === 'BUILD') {
        return Promise.reject( new Error('Instance not Ready!') );
      }

      return Repo.find({ ownerid: user.gitid, repoid: repoid }); //change pls // repoid: repoid // make sure to look for the repo with the correct id.
    })
    .then(function(data) {
      if(data.length === 0) {
        return Promise.reject( new Error('No Repo Found for User!') )
      }

      var repoData = data[0];
      
      return InstanceLogin.find({ ownergitid: user.gitid})
        .then(function(data) {
          console.log('instancelogindata = ', data)
          if(data.length > 0) {
            return Logic.runSSHPostInstall(instanceData, Commands.postInstallSetup(repoData.clone_url, data[0].daemonkey), data[0], repoData);
          }
          
          return Promise.reject( new Error('Instance Login Data not Found!') );
        })
    })
}

exports.runSSHCommands = function(userid, cmdArray) {
  var instanceData = {};

  return InstanceDB.getUserInstances(userid)
    .then( data => data[0] )
    .then( data => Instance.find({ openstackid: data.openstackid }) )
    .then(function(data) {
      if(!data) {
        return Promise.reject( new Error('Instance not Found!') );
      }
      else if(data.state.status === 'BUILD') {
        return Promise.reject( new Error('Instance not Ready!') );
      }

      instanceData = data;
      return InstanceLogin.find({ ownergitid: user.gitid});
    })
    .then( data => Logic.runCommandList(instanceData, cmdArray, data[0]) )
    .then( data => data )
}

exports.checkWebServer = function(address) {
  return request(`http://${address}`)
    .then(function(data) {
      if(data.body.match(/<title>\s*Error\s*<\/title>/) !== null) {
        return Promise.reject( new Error('Deployment Failed! NodeJS Server Not Running.') )
      }

      return data;
    })
}


