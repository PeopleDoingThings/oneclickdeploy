var mongoose = require('mongoose');
var User = require('../login/models/gituser.js');
// Set mongoose to use bluebirds promises.
mongoose.Promise = require('bluebird'); 

exports.saveUser = function(obj) {
  console.log('obj id = ', obj.id, typeof obj.id)
  var userObj = new User({
    name: obj.name,
    login: obj.login,
    gitid: String(obj.id),
    profile_url: obj.url,
    avatar_url: obj.avatar_url,
    repos_url: obj.repos_url,
    public_repos: obj.public_repos,
    followers: obj.followers,
    following: obj.following,
    created_at: obj.created_at,
    updated_at: obj.updated_at
  });

  return userObj.save();
}

exports.findByGitId = function(id) {
  return User.findOne( { 'gitid': id } )
    .then(function(data) {
      if(!data) {
        return Promise.reject( new Error('No User Found!', id) );
      }

      return data;
    })
}

exports.updateEntry = function(user) {
  return User.findByIdAndUpdate(user._id,
    { updated_at: user.updated_at, 
      following: user.following, 
      followers: user.followers,
      public_repos: user.public_repos,
      avatar_url: user.avatar_url 
    });
}