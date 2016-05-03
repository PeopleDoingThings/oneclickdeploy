var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var User = require('../../database/models/gituser.js');
var init = require('./init');
var User = require('../../database/users.js');
var UserToken = require('../../database/models/usertoken.js');
var gitCallback;
var clientID;
var clientSecret;


if(process.env.ENV === 'production') {
  gitCallback = 'https://hyperjs.io/login/github/callback';
  clientID = process.env.GITHUB_CLIENTID_PROD;
  clientSecret = process.env.GITHUB_CLIENTSECRET_PROD;
}
else {
  gitCallback = `http://localhost:${process.env.PORT}/login/github/callback`;
  clientID = process.env.GITHUB_CLIENTID;
  clientSecret = process.env.GITHUB_CLIENTSECRET;
}


passport.use(new GitHubStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: gitCallback
  },
  function(accessToken, refreshToken, profile, done) {
    var updatedEntry;

    // We update our user if found in regard to followers & profile picture as these can change often.
    User.findByGitId(profile.id)
      .then(function(user) {
        if(user.length === 0) return Promise.reject( new Error('No User Found in DB!') )

        return User.updateEntry(user, profile._json);
      })
      .then(function(data) {
        updatedEntry = data;
        return UserToken.find({ id: String(profile.id) });
      })
      .then(function(data) {
        return UserToken.findByIdAndUpdate(data._id, { token: accessToken });
      })
      .then(function(data) {
        done(null, updatedEntry);
      })
      .catch(function(err) {
        var tokenObj = new UserToken({
          id: profile.id,
          token: accessToken
        })

        tokenObj.save()
          .then(function(data) {
            return User.saveUser(profile._json);
          })
          .then(function(data) {
            done(null, data);
          })
          .catch(function(err) {
            console.log('Saving New User Failed: ', err)
          })
      })
      

  }));


init();

module.exports = passport;

