var Logic = require('./logic.js');


exports.postInstallHost = function(instanceData, cmdArray, data, repoData) {
var obj = {
    server: {
      host: instanceData.publicip,
      port: 22,
      userName: data.sshuser,
      password: data.password
    },
    commands: cmdArray,
    idleTimeOut: 30000,  // 30 second idle timeout. We can deal with timeout events below
    onCommandComplete: function( command, response, sshObj ) {
      console.log('||| COMMAND START |||')
      console.log('command ======= ', command)
      console.log('||| COMMAND END |||')
      // If there is no response from the command (because the file we grep doesn't exist) it sets false.
      if(command === 'cat bower.json') {
        var find = response.split("\r\n");
        console.log('SPLITTING NEW LINS bower = ', response.split("\r\n"))
        console.log('splitting DONE!')


        if(find[1] !== 'cat: bower.json: No such file or directory') {
          console.log('found bower file!')
          sshObj.commands.unshift('bower install');
        }
      }
      else if(command === 'cat webpack.config.js') {
        var find = response.split("\r\n");
        console.log('SPLITTING NEW LINS webpack = ', response.split("\r\n"))
        console.log('splitting DONE!')


        if(find[1] !== 'cat: webpack.config.js: No such file or directory') {
          console.log('found webpack file!')
          sshObj.commands.unshift('webpack --progress');
        }
      }
      else if(command === 'cat Procfile') {
        var find = response.split("\r\n")[1].slice(10);
        console.log('SPLITTING NEW LINES Procfile = ', response.split("\r\n"))
        console.log('splitting DONE!')
        

        sshObj.commands.unshift(`forever start ${find}`);
        sshObj.commands.unshift('export PORT=1337');
      }
      else if(command === 'cat knexfile.js | grep -i database') {
        console.log('KNEX cat response = ')
        console.log(response)
        console.log('KNEX cat END')
        var valid = response.split("\r\n");
        var find = response.split("\n").map( val => val.split("'") );
        if(find !== undefined && find[1] !== undefined) find = find[1][1];
        console.log('FIND after split = ', find)
        console.log('valid[1] ==== ', valid[1]) //this checks if there is a knex file.
        //We will want to change this logic in future in regard to updating repos from master.
        //Deal with dropping the dbs & rerunning etc.
        

        if(valid[1] !== 'cat: knexfile.js: No such file or directory') {
          sshObj.commands.unshift('sudo -u admin knex seed:run');
          sshObj.commands.unshift('sudo -u admin knex migrate:latest');
          sshObj.commands.unshift(`sudo -u postgres createdb -O admin ${find}`);
          sshObj.commands.unshift(`initdb ${find}`);
        }
      }


      // console.log('onCommandComplete: ', response)
    },
    onCommandTimeout: function(command, response, sshObj, stream, connection) {
      // Adding this section causes 'exit' events to be skipped and we can deal with timeouts here.
      console.log('CONNECTION TIMED OUT!!!!')
      console.log('TIMED OUT COMMAND = ', command)
      console.log('CONNECTION TIMED OUT!!!!')

      //optional code for responding to command timeout
      //response is the text response from the command up to it timing out
      //stream object used  to respond to the timeout without having to close the connection
      //connection object gives access to close the shell using connection.end()
    },
    onEnd: function( sessionText, sshObj ) {
      console.log('ended ssh2 session!!!')
      return Logic.setDeployed(repoData)
        .then(function(data) {
          console.log('Repo Deployment Success!');
          return data;
        })
        .catch(function(err) {
          console.log('Repo Deployment Failed!');
          return err.message;
        })
    }
  };

  return obj;
}
  