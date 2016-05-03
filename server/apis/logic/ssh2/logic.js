var SSH2Shell = require ('ssh2shell');
var Repo = require('../../../database/models/deployablerepos.js');
var InstanceLogin = require('../../../database/models/instancelogin.js');
var Helpers = require('./helpers.js');


exports.runSSHPostInstall = function(instanceData, cmdArray, loginData, repoData) {
  return new Promise(function(resolve, reject) {
    var host = Helpers.postInstallHost(instanceData, cmdArray, loginData, repoData);
    host.debug = true;
    var SSHClient = new SSH2Shell(host);
    var retries = 0;
    var superError = undefined;

        SSHClient.on("error", function onError(err, type, close, callback) {
          var authFailed = 'All configured authentication methods failed';
          superError = err.message;

          if(err.message === authFailed && retries <= 3) {
            console.log('Retrying SSH Connection!');
            console.log('Retry Attempt: ', retries);
            ++retries;
          }
          else if(err.message !== authFailed) {
            reject(err);
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

        if(retries < 3 && superError) {
          console.log('Closing, is Error? = ', superError)
          SSHClient.connect();
        }
        else if(retries >= 3) {  // This is to make sure we alway have some way to end the loop. Unlikely to be needed.
          var error = 'All configured authentication methods failed!';
          exports.setDeployError(repoData, error)
            .then( data => reject( new Error(error) ))
            .catch( err => err.message )
        }
        else {
          console.log('Connection Closed with No Errors!');
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

exports.setDeployError = function(repoData, err) {
  console.log('setDeployError = ', err, typeof err)
  return Repo.findByIdAndUpdate(repoData._id,
    {
      deployerror: err
    });
}

exports.createNewSubdomain = function(host) {
  return new Promise(function(resolve, reject) {
    var SSHClient = new SSH2Shell(host);

    SSHClient.on("close", function onClose(had_error) {
      if(had_error) {
        reject(had_error);
      }
      else {
        resolve('SubDomain Created Successfully!');
      }
    });

    SSHClient.on("ready", function onReady() {
      console.log('Connection Ready, Starting Install!')
    });

    SSHClient.on("error", function onError(err, type, close, callback) {
      if(err) {
        reject(err);
      }
      else {
        resolve('Connection Success but Ended With Error!');
      }
    })

    SSHClient.connect();
  }) 
}

// exports.reinstallDaemon = function(id) {
//   InstanceLogin.find({ ownergitid: id })
//     .then(function(data) {
//       var host = Helpers.postInstallHost(instanceData, cmdArray, data, repoData);
//     })


  
//   host.debug = true;

//   var SSHClient = new SSH2Shell(host);
//   return SSHClient.connect();
// }

exports.restartDaemon = function() {
  // Just attempts to restart the daemon with forever
}


