var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
var UserToken = new Schema({
  id: String,
  token: String
});


module.exports = mongoose.model('UserToken', UserToken);