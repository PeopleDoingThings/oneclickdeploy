var moment = require('moment');
var Moment = moment();
var Logic = require('./logic/github/logic.js');
var Repo = require('../database/models/deployablerepos.js');
var Promise = require('bluebird');
var Helper = require('./logic/github/helpers.js');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);

exports.getUserRepos = function(user) {

  return Repo.find({ ownerid: String(user.gitid) })
    .then(function(data) {
      if(data.length > 0 && Moment.diff(data[0].age, 'days') > 3) {
        return data;
      }

      return request(Helper.createRepoOpts(user.login));
    })
    .then(function(resp){
      console.log('Github Limit Remaining: ', resp.headers['x-ratelimit-remaining']);
      var condensed = JSON.parse(resp.body)
        .map(function(repo) {
          return Helper.processRepo(repo, user.login);
        });

      console.log("--------------------------------------------------------");
      console.log("--------------------------------------------------------");
      console.log("Condensed list of repos: ")
      console.log("--------------------------------------------------------");
      console.log("--------------------------------------------------------");
      console.log(condensed)
      return condensed;
    })
    .then(function(repo_list){
      // I love Bluebird.
      // This filters an array based on an async predicate function.
      return Promise.filter(repo_list, function(repo){
        return Logic.save(String(user.gitid), (validateProcfile(repo.procfile_url)));
      });
    })
    .catch(function(err) {
      console.log("Error getting user repositories: ", err)
      return [];
    });
}

function validateProcfile(procfile_url) {

  return request(Helper.createProcOpts(procfile_url))
    .then(function(resp){
      var validity = resp.body.match(/web: node/) !== null;
      console.log("--------------------------------------------------------");
      console.log("Procfile: ", procfile_url);
      console.log("Contents: ", resp.body);
      console.log("Is this valid? - ", validity);
      console.log("--------------------------------------------------------");
      return validity;
    })
    .catch(function(err) {
      //console.log("Error validating procfile: ", err)
      return false;
    });
}


