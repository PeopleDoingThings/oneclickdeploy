var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstanceLogin = new Schema({
  ownergitid: String,
  user: String,
  password: String,
  sshuser: String,
  ip: String,
  daemonkey: String
});


module.exports = mongoose.model('InstanceLogin', InstanceLogin);