var sequest = require('sequest');

  // var seq = sequest(`${user}@${ip}`, passObj);

  // seq.pipe(process.stdout);

  // cmdArray.forEach(function(val) {
  //   seq.write(val);
  // })

  // seq.end();


exports.runCommandList = function(ip, user, pass, cmdArray) {

  var host = {
    server: {     
      host: ip,
      port: 22,
      userName: user,
      password: pass
    },
    commands: cmdArray,
    msg: {
      send: function( message ) {
        console.log(message);
      }
    },
    onCommandComplete: function( command, response, sshObj ) {
      //confirm it is the root home dir and change to root's .ssh folder
      if (command === "echo $(pwd)" && response.indexOf("/root") != -1 ) {
      //unshift will add the command as the next command, use push to add command as the last command
        sshObj.commands.unshift("msg:The command and response check worked. Added another cd command.");
        sshObj.commands.unshift("cd .ssh");
      }
      //we are listing the dir so output it to the msg handler
      else if (command === "ls -l"){      
        sshObj.msg.send(response);
      }
    },
    onEnd: function( sessionText, sshObj ) {
      //email the session text instead of outputting it to the console
      var sessionEmail = new Email({ 
        from: "me@example.com", 
        to:   "me@example.com", 
        subject: "Automated SSH Session Response",
        body: "\nThis is the full session responses for " + sshObj.server.host + ":\n\n" + sessionText
      });
      this.emit('msg', "Sending session response email");
      //same as sshObj.msg.send("Sending session response email");

      // if callback is provided, errors will be passed into it
      // else errors will be thrown
      sessionEmail.send(function(err){ this.emit('error', err, 'Email'); });
    }
  };

  var SSH2Shell = require ('ssh2shell'),
      SSH       = new SSH2Shell(host);

  SSH2.connect();

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