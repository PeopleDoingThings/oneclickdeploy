var SSH2Logic = require('../ssh2/logic.js');
var Daemon = require('../../daemon.js');
var InstanceLogin = require('../../../database/models/instancelogin.js');

exports.getCommandData = function(id, command) {
  InstanceLogin.find({ ownergitid: id })
    .then(function(data) {
      return Daemon.sendCommand(data[0], command);
    })
}

// We find the users repo & daemon key then check their instance daemon responds.
exports.checkDaemonHealth = function(id, restart) {
  var repoData = {};

  InstanceLogin.find({ ownergitid: id })
    .then(function(data) {
      repoData = data[0];

      return Daemon.pingDaemon(data[0]);
    })
    .then(function(data) {
      if(!data) {
        return Promise.resolve( new Error('Ping Failed! Attempting to Restart!') );   // If the ping fails we go down to catch.
      }

      return data;  // Ping success - we return this information.
    })
    .catch(function(err) {
      if(restart === 'soft') {
        SSH2Logic.restartDaemon(id, repoData)
          .then(function(data) {
            return data;
          })
          .catch(function(err) {
            return err.message;
          })
      }
      else {
        SSH2Logic.reinstallDaemon(id, repoData)
      }
    })
}