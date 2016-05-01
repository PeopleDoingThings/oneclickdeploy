var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Env = new Schema({
  variables: Array,
  repoid: String,
  gitid: String
});


module.exports = mongoose.model('Env', Env);
