var SSH2Shell = require ('ssh2shell');
var Repo = require('../../../database/models/deployablerepos.js');
var InstanceLogin = require('../../../database/models/instancelogin.js');
var Helpers = require('./helpers.js');


exports.runSSHPostInstall = function(instanceData, cmdArray, data, repoData) {
  return new Promise(function(resolve, reject) {
    var host = Helpers.postInstallHost(instanceData, cmdArray, data, repoData);
    host.debug = true;
    var SSHClient = new SSH2Shell(host);
    var retries = 0;

        SSHClient.on("error", function onError(err, type, close, callback) {
          var authFailed = 'All configured authentication methods failed';

          if(err.message === authFailed && retries <= 3) {
            console.log('Retrying SSH Connection!');
            console.log('Retry Attempt: ', retries);
            ++retries;
          }
          else {
            // Send some error to the db.
            console.log('All Retries Failed, Deploy Fail!');
            reject( new Error('All configured authentication methods failed!') )
          }

        console.log('err = ', err.message)
        console.log('type = ', type)
        console.log('close = ', close)
        console.log('retries = ', retries)
      });

      SSHClient.on("ready", function onReady() { // On successful connect we return a promise.
        console.log('Connection Ready, Starting Install!')
        resolve('SSH Connection Successful, Beggining Install');
      });

      SSHClient.on("close", function onClose(had_error) {
        console.log('Closing Connection! ', retries)

        if(retries < 3) {
          SSHClient.connect();
        }
        else { // This is to make sure we alway have some way to end the loop. Unlikely to be needed.
          reject( new Error('All configured authentication methods failed!') )
        }
      });

    if(retries === 0) {       // It will start opening exponentially more connections if we don't check here.
      SSHClient.connect();
    }
  })
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