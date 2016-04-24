var SSH2Shell = require ('ssh2shell');

exports.runCommandList = function(data, cmdArray) {

  var host = {
    server: {
      host: data.publicip,
      port: 22,
      userName: data.ssh.user,
      password: data.ssh.pass
    },
    commands: cmdArray,
    msg: {
      send: function( message ) {
        console.log(message);
      }
    },
    onCommandComplete: function( command, response, sshObj ) {
      //confirm it is the root home dir and change to root's .ssh folder
      // if (command === "echo $(pwd)" && response.indexOf("/root") != -1 ) {
      // //unshift will add the command as the next command, use push to add command as the last command
      //   sshObj.commands.unshift("msg:The command and response check worked. Added another cd command.");
      //   sshObj.commands.unshift("cd .ssh");
      // }
      // //we are listing the dir so output it to the msg handler
      // else if (command === "ls -l"){      
      //   sshObj.msg.send(response);
      // }
      console.log('onCommandComplete: ', response)
    },
    onEnd: function( sessionText, sshObj ) {
      //email the session text instead of outputting it to the console
      return Promise.resolve(sessionText);
    }
  };

  var SSH = new SSH2Shell(host);

  return SSH2.connect();
}









// local & remote path are strings.
exports.writeRemoteFile = function(user, ip, remotepath, localpath) {
  var writer = sequest.put(`${user}@${ip}`, remotepath)
  fs.createReadStream(localpath).pipe(writer)
  writer.on('close', function () {
    // finished writing.
  })
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