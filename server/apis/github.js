var moment = require('moment');
var Moment = moment();
var Logic = require('./logic/github/logic.js');
var Repo = require('../database/models/deployablerepos.js');
var Promise = require('bluebird');
var Helper = require('./logic/github/helpers.js');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);

exports.getUserRepos = function(user, query) {

  return Repo.find({ ownerid: String(user.gitid) })
    .then(function(data) {
      if(data.length > 0 && Moment.diff(data[0].age, 'days') < 3 && query !== 'true') {
        return Promise.reject(data);  // We reject here to send our data back straight from the db.
      }

      return Repo.remove({ ownerid: String(user.gitid), deployed: false });  // We need to keep track of deployed repos!
    })
    .then(function(data) {
      return request(Helper.createRepoOpts(user.login));
    })
    .then(function(resp){
      console.log('Github Limit Remaining: ', resp.headers['x-ratelimit-remaining']);
      var condensed = JSON.parse(resp.body)
        .map(function(repo) {
          return Helper.processRepo(repo, user.login);
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
      return Promise.filter( repo_list, val => validateProcfile(val.procfile_url) );
    })
    .then(function(data) {
      console.log('filtered repo list = ', data);
      return Promise.all( data.map( val => Logic.save(String(user.gitid), val) ) );
    })
    .catch(function(err) {
      if(Array.isArray(err)) { // We check here to see if this is db data instead of a real error.
        console.log('found data in DB returning! = ', err)
        return err;
      }

      return [];
    });
}

function validateProcfile(procfile_url) {

  return request(Helper.createProcOpts(procfile_url))
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
      console.log("Error validating procfile: ", err)
      return false;
    });
}


