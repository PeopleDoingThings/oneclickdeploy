var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var User = require('../models/gituser.js');
var init = require('./init');
var User = require('../../database/users.js');

/*
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENTID,
  clientSecret: process.env.GITHUB_CLIENTSECRET,
  callbackURL: 'http://localhost:' + process.env.PORT + '/login/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {

    var searchQuery = {
      name: profile.displayName
    };

    var updates = {
      name: profile.displayName,
      someID: profile.id
    };

    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }));

// serialize user into the session
init();


module.exports = passport;

*/