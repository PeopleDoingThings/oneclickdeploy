var req = require('request');
var Helpers = require('./logic/ssh2/helpers.js');
var InstanceDB = require('../database/instances.js');
var Instance = require('../database/models/instance.js');
var Logic = require('./logic/ssh2/logic.js');
var Commands = require('./logic/ssh2/commands.js');
var Repo = require('../database/models/deployablerepos.js');
var Env = require('../database/models/env.js');
var EnvDB = require('../database/env.js');
var InstanceLogin = require('../database/models/instancelogin.js');
var CMDHelper = require('./logic/ssh2/cmdhelpers.js');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);


// Body should contain start command / repo url & name of server file
exports.runSSHPostInstallSetup = function(user, repoid) {
  var loginData = {};
  var instanceData = {};
  var repoData = {};
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

      repoData = data[0];
      
      return InstanceLogin.find({ ownergitid: user.gitid})
    })
    .then(function(data) {
      console.log('instance login data = ', data)
      if(data.length > 0) {
        loginData = data[0];
        return Commands.postInstallSetup(repoData, loginData);
      }
      
      return Promise.reject( new Error('Instance Login Data not Found!') );
    })
    .then(function(cmdArray) {
      console.log('cmdArray = ', cmdArray)
      return Logic.runSSHPostInstall(instanceData, cmdArray, loginData, repoData);
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
      else if(!data.body) {
        console.log('checkWebServer Problem: ', data.body)
        return Promise.reject( new Error('Deployment Failed! WebServer Not Responding.') )
      }

      console.log('Deployment Success: ', data.body);

      return data;
    })
}

exports.setEnv = function(body, repoId, gitId) {
  return EnvDB.getEnv(repoId, gitId)
    .then(function(data) {
      return EnvDB.updateEnv(data[0]._id, body, repoId, gitId);
    })
    .catch(function(err) {
      console.log('Saving New Environment Variables: ', err)
      return EnvDB.saveNew(body, repoId, gitId);
    })
}

exports.getEnv = function(repoId, gitId) {
  return EnvDB.getEnv(repoId, gitId);
}

exports.createSubDomain = function(id, subDomain) {
  var instanceData;
  if(!subDomain) {
    return Promise.reject( new Error('Please Enter A Subdomain!') )
  }

  return Instance.find({ ownergitid: id })
    .then(function(data) {
      if(!data || data.length === 0) return Promise.reject( new Error('No Instance Found for User!') );
      
      instanceData = data[0];
      return data[0];
    })
    .then(function(data) {
      var commandArray = Commands.addNewVirtualHost(id, subDomain, data.publicip);
      console.log('Commands Array = ', commandArray)
      var generateHost = Helpers.subdomainHost(commandArray);

      return Logic.createNewSubdomain(generateHost, id, subDomain);
    })
    .then(function(data) {
      Instance.findByIdAndUpdate(instanceData._id, {
        'state.subdomain': subDomain
      })

      return data;
    })
}

exports.updateRepoFromMaster = function(userid) {
  var insLogin;

  return CMDHelper.findDeployedRepoAndLoginData(userid)
    .then(function(data) {
      insLogin = data.insLogin;
      return Commands.createRepoUpdateCmds(data.userRepo);
    })
    .then(function(commands) {
      var host = Helpers.createRepoUpdateHost(commands, insLogin);
      
      return Logic.updateRepoFromMaster(host);
    })
}

exports.deleteDeployedRepo = function(userid) {
  var userRepo;

  return CMDHelper.findDeployedRepoAndLoginData(userid)
    .then(function(data) {
      userRepo = data.userRepo;
      return Commands.findDeployedAndDelete(data.insLogin, data.userRepo);
    })
    .then(function(data) {
      return Helpers.createRepoUpdateHost(data.cmds, data.insLogin);
    })
    .then(function(host) {
      return Logic.deleteRepoData(host);
    })
    .then(function(data) {
      Repo.findByIdAndUpdate(userRepo._id, {
        deployed: false 
      })
      .then( data => console.log('Set Repo to Not Deployed: ', data) )

      return data;
    })
}

exports.restartJS = function(userid) {
  return CMDHelper.findDeployedRepoAndLoginData(userid)
    .then(function(data) {
      return Commands.createJSRestartCommands(data.insLogin, data.userRepo);
    })
    .then(function(data) {
      return Helpers.createJSRestartHost(data);
    })
    .then(function(host) {
      return Logic.restartJS(host);
    })
}
