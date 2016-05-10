var SSH2Shell = require ('ssh2shell');
var Repo = require('../../../database/models/deployablerepos.js');
var InstanceLogin = require('../../../database/models/instancelogin.js');
var Helpers = require('./helpers.js');
var Global = require('../../../globals/globals.js');
var sshSocket = require('../../../globals/proxy.js');


exports.runSSHPostInstall = function(instanceData, cmdArray, loginData, repoData, gitid) {
  return new Promise(function(resolve, reject) {

    var host = Helpers.postInstallHost(instanceData, cmdArray, loginData, repoData);
    host.debug = true;
    var SSHClient = new SSH2Shell(host);
    var retries = 0;
    var superError = undefined;
    var socketid = [];

    for(var prop in Global.io.sockets.connected) {
      console.log('connected clients prop: ', prop)
      console.log('client git id: ', Global.io.sockets.connected[prop].github)
      console.log('github id = ', gitid)
      console.log('github id = gitid: ', gitid === Global.io.sockets.connected[prop].github);
      // do we need to emit on every socket associated with a user?
      if(Global.io.sockets.connected[prop].github === gitid) {
        console.log('found git id!')
        socketid.push(prop.toString().slice(2));
      }
    }

    console.log('socketid array = ', socketid)

    Global.io.emit('sshconn', 'SSH Connceted: (cmd from server)!');
    console.log('recieved sshstart event on socket!');

      SSHClient.on("commandComplete", function onCommandProcessing( command, response ) {
        console.log('SSH Command Complete, Emitting!');

        socketid.forEach(function(val) {
          Global.io.sockets.connected[`/#${val}`].emit('sshcmd', `Just for you! ${command}`);
          Global.io.sockets.connected[`/#${val}`].emit('sshresp', `Just for you! ${response}`);
        })

      })

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

exports.restartJS = function(host) {
  return new Promise(function(resolve, reject) {
    var SSHClient = new SSH2Shell(host);

    SSHClient.on("close", function onClose(had_error) {
      if(had_error) {
        reject('Restart Failed with Error: ', had_error);
      }
      else {
        resolve('Restarted JS Servers Successfully');
      }
    });

    SSHClient.on("ready", function onReady() {
      console.log('Connection Ready, Starting Install!')
    });

    SSHClient.on("commandComplete", function onCommandProcessing( command, response ) {
      io.on('connection', function(socket) {
        console.log('connected ssh post socket!')
        socket.emit('ssh', command);
        socket.emit('ssh', response);
      })

      if(command === "forever list") {
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
        resolve('Restart JS Connection Success but Ended With Error!');
      }
    })

    SSHClient.connect();
  }) 
}
