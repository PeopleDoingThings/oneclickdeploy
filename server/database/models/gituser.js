var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
var User = new Schema({
  name: String,
  login: String,
  gitid: String,
  token: String,
  profile_url: String,
  avatar_url: String,
  repos_url: String,
  public_repos: String,
  followers: String,
  following: String,
  created_at: String,
  updated_at: String
});


module.exports = mongoose.model('User', User);