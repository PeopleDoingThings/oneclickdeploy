var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Repo = new Schema({
  deployed: Boolean,
  deployerror: String,
  repoid: String,
  ownerid: String,
  name: String,
  age: Date,
  clone_url: String,
  procfile_url: String
});


module.exports = mongoose.model('Repo', Repo);

