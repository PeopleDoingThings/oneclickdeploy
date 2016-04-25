var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Repos = new Schema({
  deployed: Boolean,
  repoid: String,
  ownerid: String,
  name: String,
  clone_url: String,
  procfile_url: String
});


module.exports = mongoose.model('Repos', Repos);

