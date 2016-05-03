var InstanceLogin = require('./models/instancelogin.js');

exports.findAndUpdateIP = function(ownerid, ip) {
  return InstanceLogin.find({ ownergitid: ownerid })
    .then(function(data) {
      return InstanceLogin.findByIdAndUpdate(data[0]._id, { ip: ip });
    })
}

exports.findInstanceLogin = function(gitid) {
  return InstanceLogin.find({ ownergitid: gitid })
    .then(function(data) {
      if(data.length === 0) {
        return Promise.reject( new Error('No Instance Login Credentials Found for User!') )
      }

      return data[0];
    })
}