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
    idleTimeOut: 30000,
    msg: {
      send: function( message ) {
        console.log(message);
      }
    },
    onCommandComplete: function( command, response, sshObj ) {
      // If there is no response from the command(because the file we grep doesn't exist) it sets false.
      console.log('||| COMMAND START |||')
     console.log('command ======= ', command)
     console.log('||| COMMAND END |||')
      if(command === 'cat bower.json') {
        var find = response.split("\r\n");
        console.log('SPLITTING NEW LINS bower = ', response.split("\r\n"))
        console.log('splitting DONE!')


        if(find[1] !== 'cat: bower.json: No such file or directory') {
          sshObj.commands.unshift('bower install');
        }
      }
      else if(command === 'cat webpack.config.js') {
        var find = response.split("\r\n");
        console.log('SPLITTING NEW LINS webpack = ', response.split("\r\n"))
        console.log('splitting DONE!')


        if(find[1] !== 'cat: webpack.config.js: No such file or directory') {
          sshObj.commands.unshift('webpack --progress');
        }
      }
      else if(command === 'cat Procfile') {
        var find = response.split("\r\n")[1].slice(10);
        console.log('SPLITTING NEW LINS Procfile = ', response.split("\r\n"))
        console.log('splitting DONE!')
        

        sshObj.commands.unshift(`forever start ${find}`);
        sshObj.commands.unshift('export PORT=1337');
      }

      console.log('command = ', command)
      // console.log('onCommandComplete: ', response)
    },
    onEnd: function( sessionText, sshObj ) {
      console.log('ended ssh2 session!!!')
    }
  };
  host.debug = true;
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