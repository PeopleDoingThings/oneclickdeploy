var InstanceLogin = require('./models/instancelogin.js');

exports.findAndUpdateIP = function(ownerid, ip) {
  InstanceLogin.find({ ownergitid: ownerid })
    .then(function(data) {
      return InstanceLogin.findByIdAndUpdate(data[0]._id, { ip: ip });
    })
}