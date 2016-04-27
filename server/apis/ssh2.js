var req = require('request');
var Helpers = require('./logic/ssh2/helpers.js');
var Instance = require('../database/instances.js')
//This methods file includes our logic and isolates it from our API.
var Logic = require('./logic/ssh2/logic.js');
var Commands = require('./logic/ssh2/commands.js');
var Repo = require('../database/models/deployedrepos.js');
var InstanceLogin = require('../database/models/instancelogin.js');


// Body should contain start command / repo url & name of server file
exports.runSSHPostInstallSetup = function(user, repoid) {
  var instanceData = {};

  return Instance.getUserInstances(String(user.gitid))
    .then(function(data) {
      return data[0].openstackid;
    })
    .then(function(data) {
      console.log('getting instance id = ', data)
      return Instance.getInstanceById(data);
    })
    .then(function(data) {
      console.log('got instance ssh2.js 19 = ', data[0])
      instanceData = data[0];
      if(data.length === 0) {
        return Promise.reject( new Error('Instance not Found!') );
      }
      else if(data[0].state.status === 'BUILD') {
        return Promise.reject( new Error('Instance not Ready!') );
      }

      return Repo.find({ ownerid: String(user.gitid) }); //change pls // repoid: repoid // make sure to look for the repo with the correct id.
    })
    .then(function(data) {
      var repoData = data[0];

      if(data.length === 0) {
        return Promise.reject( new Error('No Repo Found for User: !') )
      }

      console.log('gitid 41 ssh2.js = ', user)

      return InstanceLogin.find({ ownergitid: user.gitid})
        .then(function(data) {
          console.log('instancelogindata = ', data)
          if(data.length > 0) {
            return Logic.runCommandList(instanceData, Commands.postInstallSetup(repoData.clone_url, data[0].daemonkey), data[0]);
          }
          
          return Promise.reject( new Error('Instance Login Data not Found!') );
        })
        .then(function(data) {
          return Logic.setDeployed(repoData);
        })
    })
}

exports.runSSHCommands = function(userid, cmdArray) {
  var instanceData = {};

  return Instance.getUserInstances(userid)
    .then(function(data) {
      console.log('found user instance = ', data)
      return data[0];
    })
    .then(function(data) {
      console.log('ss2 66 found user instance = ', data)
      return Instance.getInstanceById(data.openstackid);
    })
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
    .then(function(data) {
      return Logic.runCommandList(instanceData, cmdArray, data[0]);
    })
    .then(function(data) {
      return data;
    })
}




