var SSH2Shell = require ('ssh2shell');
var Repo = require('../../../database/models/deployedrepos.js');
var Helpers = require('./helpers.js');


exports.runSSHPostInstall = function(instanceData, cmdArray, data, repoData) {
  var host = Helpers.postInstallHost(instanceData, cmdArray, data, repoData);
  host.debug = true;

  var SSHClient = new SSH2Shell(host);
  return SSHClient.connect();
}

exports.setDeployed = function(repoData) {   // Should likely be in helpers.js
  return Repo.findByIdAndUpdate(repoData._id,
    {
      deployed: true
    });
}

exports.reinstallDaemon = function() {
  // This will reinstall the daemon.
}

exports.restartDaemon = function() {
  // Just attempts to restart the daemon with forever
}
