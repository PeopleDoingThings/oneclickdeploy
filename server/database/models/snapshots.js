var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SnapShot = new Schema({
  ownergitid: String,
  
});


module.exports = mongoose.model('SnapShot', SnapShot);