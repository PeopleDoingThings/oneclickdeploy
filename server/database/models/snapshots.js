var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SnapShot = new Schema({
  creationDate: Date,
  id: String,
  minDisk: Number,
  minRam: Number,
  name: String,
  region: String,
  status: String,
  type: String,
  user: String,
  visibility: String,
  ownerid: String
});


module.exports = mongoose.model('SnapShot', SnapShot);