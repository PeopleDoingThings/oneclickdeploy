var SSH2Shell = require ('ssh2shell');
var Repo = require('../../../database/models/deployablerepos.js');
var InstanceLogin = require('../../../database/models/instancelogin.js');
var Helpers = require('./helpers.js');


exports.runSSHPostInstall = function(instanceData, cmdArray, data, repoData) {
  var host = Helpers.postInstallHost(instanceData, cmdArray, data, repoData);
  host.debug = true;

  var SSHClient = new SSH2Shell(host);
  return SSHClient.connect();
}

exports.setDeployed = function(repoData) {
  return Repo.findByIdAndUpdate(repoData._id,
    {
      deployed: true
    });
}

exports.reinstallDaemon = function(id) {
  InstanceLogin.find({ ownergitid: id })
    .then(function(data) {
      var host = Helpers.postInstallHost(instanceData, cmdArray, data, repoData);
    })


  
  host.debug = true;

  var SSHClient = new SSH2Shell(host);
  return SSHClient.connect();
}

exports.restartDaemon = function() {
  // Just attempts to restart the daemon with forever
}