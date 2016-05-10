var Logic = require('./logic.js');
var SSH2 = require('../../ssh2.js');


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
        find = find.split('.')[0] + '.js';
        console.log('SPLITTING NEW LINES Procfile = ', response.split("\r\n"))
        console.log('splitting DONE!')
        

        sshObj.commands.unshift(`forever start ${find}`);
        sshObj.commands.unshift('export PORT=1337');
      }
      else if(command === 'cat knexfile.js | grep database') {
        console.log('KNEX cat response = ')
        console.log(response)
        console.log('KNEX cat END')
        var valid = response.split("\r\n");
        var find = response.split("\n").map( val => val.split("'") );
        var dblist = find.slice();
        dblist.pop().shift();
        console.log('All the dbs should be listed here: ', dblist)
        if(find !== undefined && find[1] !== undefined) find = find[1][1];
        console.log('FIND after split = ', find)
        console.log('valid[1] ==== ', valid[1]) 
        //this checks if there is a knex file.
        //We will want to change this logic in future in regard to updating repos from master.
        //Deal with dropping the dbs & rerunning etc.
        
        if(valid[1] !== 'cat: knexfile.js: No such file or directory') {
          sshObj.commands.unshift('sudo -u admin knex seed:run');
          sshObj.commands.unshift('sudo -u admin knex migrate:latest');
          sshObj.commands.unshift(`sudo -u postgres createdb -O admin ${find}`);
          sshObj.commands.unshift(`initdb ${find}`);
        }
      }

    },
    onEnd: function( sessionText, sshObj ) {

      SSH2.checkWebServer(instanceData.publicip)
        .then(function(data) {
          return Logic.setDeployed(repoData);
        })
        .then(function(data) {
          console.log('Repo Deployment Success!');
          return data;
        })
        .catch(function(err) {
          console.log('Repo Deployment Failed!');
          return Logic.setDeployError(repoData, err.message);
        })
        .then(function(data) {
          console.log('db err dep data = ', data)
          return data;
        })
    }
  };

  return obj;
}

exports.subdomainHost = function(cmdArray) {
  console.log('creating subdomainHost = ', cmdArray)
  var obj = {
    server: {
      host: process.env.VHOST_SERVER_IP,
      port: 22,
      userName: process.env.VHOST_SERVER_USER,
      password: process.env.VHOST_SERVER_PASS
    },
    commands: cmdArray,
    idleTimeOut: 5000,  // 30 second idle timeout. We can deal with timeout events below
    onCommandComplete: function( command, response, sshObj ) {
      console.log('Command Start: ============')
      console.log('Command : ', command)
      console.log('Command End:   ============')
      console.log('Command Response Start: ============')
      console.log('Command Response: ', response)
      console.log('Command Response End:   ============')

    },
    onEnd: function( sessionText, sshObj ) {
      console.log('sessionText Start: ')
      console.log('sessionText: ', sessionText)
      console.log('sessionText Start: ')
    }
  };

  return obj;
}

exports.createRepoUpdateHost = function(cmdArray, loginData) {

  console.log('updateRepoFromGitHub = ', cmdArray, loginData)
  var obj = {
    server: {
      host: loginData.ip,
      port: 22,
      userName: loginData.sshuser,
      password: loginData.password
    },
    commands: cmdArray,
    idleTimeOut: 10000,  // 30 second idle timeout. We can deal with timeout events below
    onCommandComplete: function( command, response, sshObj ) {
      console.log('Command Start: ============')
      console.log('Command : ', command)
      console.log('Command End:   ============')
      console.log('Command Response Start: ============')
      console.log('Command Response: ', response)
      console.log('Command Response End:   ============')


      if(command === 'git pull origin master') {
        var find = response.split("\n");
        console.log('git pull resp = ', find)
        
      }

      if(command === 'cat Procfile') {
        var find = response.split("\r\n")[1].slice(10);
        find = find.split('.')[0] + '.js';
        console.log('SPLITTING NEW LINES Procfile = ', response.split("\r\n"))
        console.log('splitting DONE!')
        

        sshObj.commands.unshift(`forever start ${find}`);
        sshObj.commands.unshift('export PORT=1337');
      }

    },
    onEnd: function( sessionText, sshObj ) {
      console.log('sessionText Start: ')
      // console.log('sessionText: ', sessionText)
      console.log('sessionText Start: ')
    }
  };

  return obj;
}

exports.createRepoDeleteHost = function(cmdArray, loginData) {
  console.log('deleteRepoHost = ', cmdArray, loginData)
  var obj = {
    server: {
      host: loginData.ip,
      port: 22,
      userName: loginData.sshuser,
      password: loginData.password
    },
    commands: cmdArray,
    idleTimeOut: 10000,  // 30 second idle timeout. We can deal with timeout events below
    onCommandComplete: function( command, response, sshObj ) {
      console.log('Command Start: ============')
      console.log('Command : ', command)
      console.log('Command End:   ============')
      console.log('Command Response Start: ============')
      console.log('Command Response: ', response)
      console.log('Command Response End:   ============')
    },
    onEnd: function( sessionText, sshObj ) {
      console.log('sessionText Start: ')
      console.log('sessionText: ', sessionText)
      console.log('sessionText Start: ')
    }
  };

  return obj;
}

exports.createJSRestartHost = function(cmdArray, loginData) {
  console.log('createJSRestartHost = ', cmdArray, loginData)
  var obj = {
    server: {
      host: loginData.ip,
      port: 22,
      userName: loginData.sshuser,
      password: loginData.password
    },
    commands: cmdArray,
    asciiFilter:        "[^\r\n\x20-\x7e]", //optional regular exression string 
    diableColorFilter:  false, //optional bollean  
    textColorFilter:    "(\x1b\[[0-9;]*m)",
    idleTimeOut: 10000,  // 10 second idle timeout. We can deal with timeout events below
    onCommandComplete: function( command, response, sshObj ) {
      console.log('Command Start: ============')
      console.log('Command : ', command)
      console.log('Command End:   ============')
      console.log('Command Response Start: ============')
      console.log('Command Response: ', response)
      console.log('Command Response End:   ============')

      if(command === 'cat Procfile') {
        var find = response.split("\r\n")[1].slice(10);
        find = find.split('.')[0] + '.js';
        console.log('SPLITTING NEW LINES Procfile = ', response.split("\r\n"))
        console.log('splitting DONE!')
        

        sshObj.commands.unshift(`forever start ${find}`);
        sshObj.commands.unshift('export PORT=1337');
      }
    },
    onEnd: function( sessionText, sshObj ) {
      console.log('sessionText Start: ')
      console.log('sessionText: ', sessionText)
      console.log('sessionText Start: ')
    }
  };

  return obj;
}




