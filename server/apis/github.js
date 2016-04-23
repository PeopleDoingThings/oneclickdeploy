var Promise = require('bluebird');
var Helper = require('./logic/github/helpers.js');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);

exports.getUserRepos = function(user) {
  var repo_options = {
    url: `https://api.github.com/users/${user}/repos?sort=updated`,
    headers: {
      'User-Agent': 'peopleDoingThings/oneclickdeploy',
      // 'Access-Control-Allow-Origin': '*', 
      // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
    }
  };

  return request(repo_options)
    .then(function(resp){
      var condensed = JSON.parse(resp.body)
        .map(function(repo) {
          return Helper.processRepo(repo, user);
        });

      // console.log("--------------------------------------------------------");
      // console.log("--------------------------------------------------------");
      // console.log("Condensed list of repos: ")
      // console.log("--------------------------------------------------------");
      // console.log("--------------------------------------------------------");
      // console.log(condensed)
      return condensed;
    })
    .then(function(repo_list){

      // I love Bluebird.
      // This filters an array based on an async predicate function.
      return Promise.filter(repo_list, function(repo){
        return Promise.resolve(validateProcfile(repo.procfile_url))
      });
    })
    .catch(function(err) {
      // console.log("Error getting user repositories: ", err)
      return [];
    });
}

function validateProcfile(procfile_url) {
  var procfile_options = {
    url: procfile_url,
    headers: {
      'User-Agent': 'peopleDoingThings/oneclickdeploy'
    }
  };

  return request(procfile_options)
    .then(function(resp){
      var validity = resp.body.match(/web: node/) !== null;
      // console.log("--------------------------------------------------------");
      // console.log("Procfile: ", procfile_url);
      // console.log("Contents: ", resp.body);
      // console.log("Is this valid? - ", validity);
      // console.log("--------------------------------------------------------");
      return validity;
    })
    .catch(function(err) {
      // console.log("Error validating procfile: ", err)
      return false;
    });
}