var moment = require('moment');
var Moment = moment();
var Logic = require('./logic/github/logic.js');
var Repo = require('../database/models/deployablerepos.js');
var Promise = require('bluebird');
var Helper = require('./logic/github/helpers.js');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);

exports.getUserRepos = function(user, forceRequery) {
  return Repo.find({ ownerid: user.gitid })
    .then(function(data) {
      if(data.length > 0 && Moment.diff(data[0].age, 'days') < 3 && forceRequery !== 'true') {
        return Promise.reject(data);  // We reject here to send our data back straight from the db.
      }

      return Repo.remove({ ownerid: user.gitid, deployed: false });  // We need to keep track of deployed repos!
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
      return repo_list.concat.apply(getUserOrgRepos(user))
    })
    .then(function(full_repo_list){
      console.log('*******************************************************');
      console.log('********** Full repo list: ', full_repo_list)

      return Promise.filter( full_repo_list, val => validateProcfile(val.procfile_url));
    })
    .then(function(data) {
      console.log('filtered repo list = ', data);
      return Promise.all( data.map( val => Logic.save(user.gitid, val) ) );
    })
    .catch(function(err) {
      if(Array.isArray(err)) { // We check here to see if this is db data instead of a real error.
        console.log('found data in DB returning! = ', err)
        return err;
      }

      return [];
    });
}

function getUserOrgRepos(user){
  return request(Helper.createOrgOpts(user.login, user.AccessToken))
  .then(function(org_list){
    console.log('response from get orgs: ', org_list)
    
    return Promise.all(org_list.map((org) => exports.getUserRepos(org, true)))
  })
  .then(function(org_repo_list){
    console.log('the full list is: ', org_repo_list)

    return full_list 
  })
  .catch(function(err){
    console.log('shit blew the f up: ', err)
  })
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


