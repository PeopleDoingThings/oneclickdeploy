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
          var unReachable = 'connect ENETUNREACH';
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
          ++retries;
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

exports.createNewSubdomain = function(host, id, subDomain) {
  return new Promise(function(resolve, reject) {
    var SSHClient = new SSH2Shell(host);

    SSHClient.on("close", function onClose(had_error) {
      if(had_error) {
        reject(had_error);
      }
      else {
        Repo.find({ ownerid: id, deployed: true })
          .then(function(data) {
            console.log('Repo Data for Update = ', data)
            console.log('Update with SubDomain: ', subDomain)
            if(data.length === 0) resolve('SubDomain Created But No Deployed Repo Found for User')
            else {
              Repo.findByIdAndUpdate(data[0]._id, {
                subdomain: subDomain
              })
              .then(function(data) {
                console.log('Updated SubDomain repo = ', data)
              })

              resolve(`SubDomain: ${subDomain} Created Successfully!`);
            }
          })
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

exports.restartDaemon = function() {
  // Just attempts to restart the daemon with forever
}

exports.updateRepoFromMaster = function(host) {
    return new Promise(function(resolve, reject) {
    var SSHClient = new SSH2Shell(host);

    SSHClient.on("close", function onClose(had_error) {
      if(had_error) {
        reject(had_error);
      }
      else {
        resolve('Repo Updated Successfully');
      }
    });

    SSHClient.on("ready", function onReady() {
      console.log('Connection Ready, Starting Install!')
    });

    SSHClient.on("commandComplete", function onCommandProcessing( command, response ) {
      if(command === "git pull origin master") {
        var split = response.split('\r\n');
        split.pop(); // cut off the shell new line prompt.
        resolve(split);
      }
    })

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

exports.deleteRepoData = function(host) {
    return new Promise(function(resolve, reject) {
    var SSHClient = new SSH2Shell(host);

    SSHClient.on("close", function onClose(had_error) {
      if(had_error) {
        reject(had_error);
      }
      else {
        resolve('Repo Deleted Successfully!');
      }
    });

    SSHClient.on("ready", function onReady() {
      console.log('Connection Ready, Starting Repo Removal')
    });

    SSHClient.on("error", function onError(err, type, close, callback) {
      if(err) {
        reject(err);
      }
      else {
        resolve('Connection Success for Delete Repo, but Ended With Error!');
      }
    })

    SSHClient.connect();
  }) 
}
