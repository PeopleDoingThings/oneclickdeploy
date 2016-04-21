var express = require('express');
var router = express.Router();
var GITHUB = require('../github.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/github'. 

router.get('/repos', function(req, res) {

  var testUser = "chppr"

  GITHUB.getUserRepos(testUser)
  .then(function(resp) {

    var data = JSON.parse(resp.body)

    var filtered = data.map(function(repo) {
      var condensed = {};

        condensed.id = repo.id;
        condensed.name = repo.name;
        condensed.clone_url = repo.clone_url;
        condensed.contents_url = repo.contents_url;
        condensed.procfile_url = condensed.contents_url.replace("{+path}", "Procfile")

      return condensed;
    });

    res.send(filtered);
  })
  .catch(function(err) {
    console.log('Error finding github repos for user:', err);
    res.send(err);
  })


})

module.exports = router;