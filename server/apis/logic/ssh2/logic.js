var SSH2Shell = require ('ssh2shell');
var sequest = require('sequest');
var Repo = require('../../../database/models/deployedrepos.js');

exports.runCommandList = function(instanceData, cmdArray, data) {

  var host = {
    server: {
      host: instanceData.publicip,
      port: 22,
      userName: data.sshuser,
      password: data.password
    },
    commands: cmdArray,
    msg: {
      send: function( message ) {
        console.log(message);
      }
    },
    onCommandComplete: function( command, response, sshObj ) {
      // If there is no response from the command(because the file we grep doesn't exist) it sets false.
      if(command === 'ls -a | grep -i bower.json' && response !== command) {
        console.log('response was = ', response)
        console.log('adding bower to list!')
        sshObj.commands.unshift('bower install');
      }
      else if(command === 'ls -a | grep -i webpack.config.js' && response !== command) {
        console.log('response was = ', response)
        console.log('adding webpack to list!')
        sshObj.commands.unshift('webpack');
      }
      else if(command === 'cat Procfile | grep -i web:\ node' && response !== command) {
        var nodejs = response.slice(9);
        console.log('=============== STARTING FILE =============')
        console.log('=============== ' + nodejs + ' =============')

        console.log('response was = ', response)
        console.log('adding nodejs to list!')
        sshObj.commands.unshift(`forever start ${nodejs}`);
      }

      // console.log('command = ', command)
      // console.log('onCommandComplete: ', response)
    },
    onEnd: function( sessionText, sshObj ) {
      //email the session text instead of outputting it to the console
      console.log(sessionText, sshObj);
    }
  };

  var SSHClient = new SSH2Shell(host);

  return SSHClient.connect();
}

// local & remote path are strings.
exports.writeRemoteFile = function(user, ip, remotepath, localpath) {
  var writer = sequest.put(`${user}@${ip}`, remotepath)
  fs.createReadStream(localpath).pipe(writer)
  writer.on('close', function () {
    // finished writing.
  })
}

exports.setDeployed = function(repoData) {
  return Repo.findByIdAndUpdate(repoData._id,
    {
      deployed: true
    });
}

// Commands Examples! SSH2Shell
// [
//   "`This is a message that will be added to the full sessionText`",
//   "msg:This is a message that will be handled by the msg.send code",
//   "echo $(pwd)",
//   "sudo su",
//   "msg:changing directory",
//   "cd ~/",
//   "ls -l",
//   "msg:Confirming the current path",
//   "echo $(pwd)",
//   "msg:Getting the directory listing to confirm the extra command was added",
//   "ls -l",
//   "`All done!`"
// ]