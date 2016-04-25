var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstanceLogin = new Schema({
  ownergitid: String,
  user: String,
  password: String,
  daemonkey: String
});


module.exports = mongoose.model('InstanceLogin', InstanceLogin);