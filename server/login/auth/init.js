var passport = require('passport');
var User = require('../../database/users.js');


module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user.gitid);
  });

  passport.deserializeUser(function(gitid, done) {
    User.findByGitId(gitid)
      .then(function(user) {
        done(null, user);
      })
      .catch(function(err) {
        done(err);
      })
  });

};