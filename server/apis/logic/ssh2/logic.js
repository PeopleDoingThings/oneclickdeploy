var SSH2Shell = require ('ssh2shell');
var Repo = require('../../../database/models/deployedrepos.js');

exports.runCommandList = function(instanceData, cmdArray, data) {
  console.log('user repo data = ', data)
  console.log('user instanceData = ', instanceData)

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
      if(command === 'ls -a | grep -i bower.json' && response) {
        sshObj.commands.unshift('bower install');
      }
      else if(command === 'ls -a | grep -i webpack.config.js' && response) {
        sshObj.commands.unshift('webpack');
      }
      else if(command === 'cat Procfile | grep -i web:\ node' && response) {
        var nodejs = response.slice(9);
        sshObj.commands.push(`forever start ${nodejs}`);
      }

      console.log('==== sshOBJ =====', sshObj)
      console.log('command = ', command)
      console.log('onCommandComplete: ', response)
    },
    onEnd: function( sessionText, sshObj ) {
      //email the session text instead of outputting it to the console
      return Promise.resolve(sessionText);
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