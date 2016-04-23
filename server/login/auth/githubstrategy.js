var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var User = require('../models/gituser.js');
var init = require('./init');
var User = require('../../database/users.js');


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENTID,
  clientSecret: process.env.GITHUB_CLIENTSECRET,
  callbackURL: 'http://localhost:' + process.env.PORT + '/login/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {

    // We update our user if found in regard to followers & profile picture as these can change often.
    User.findByGitId(profile.id)
      .then(function(data) {
        return User.updateEntry(data);
      })
      .then(function(data) {
        return done(null, data);
      })
      .catch(function(err) {
        User.saveUser(profile._json)
          .then(function(data) {
            return done(null, data);
          })
          .catch(function(err) {
            return done(err);
          })
      })


  }));


init();

module.exports = passport;

