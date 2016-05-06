var mongoose = require('mongoose');
var User = require('./models/gituser.js');
// Set mongoose to use bluebirds promises.
mongoose.Promise = require('bluebird'); 

exports.saveUser = function(obj) {
  console.log('Saving User = ', obj)
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
      if(!data || data.length === 0) {
        return Promise.reject( new Error('No User Found!') );
      }

      return data;
    })
}

exports.updateEntry = function(user, profile) {
  console.log('updating entry with = ', user, profile)
  return User.findByIdAndUpdate(user._id,
    { updated_at: profile.updated_at,
      following: profile.following, 
      followers: profile.followers,
      public_repos: profile.public_repos,
      avatar_url: profile.avatar_url
    });
}