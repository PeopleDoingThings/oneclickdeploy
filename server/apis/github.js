var moment = require('moment');
var Moment = moment();
var Logic = require('./logic/github/logic.js');
var Repo = require('../database/models/deployablerepos.js');
var Promise = require('bluebird');
var Helper = require('./logic/github/helpers.js');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);

exports.getIndividualRepos = function(user, forceRequery) {

  var ownerid =  user.gitid ? user.gitid : user.id 
  return Repo.find({ ownerid: ownerid })
    .then(function(data) {
      if(data.length > 0 && Moment.diff(data[0].age, 'days') < 3 && forceRequery !== 'true') {
        console.log('Getting Data from DB rejecting!')
        return Promise.reject(data);
      }

      return Repo.remove({ ownerid: ownerid, deployed: false });  // We need to keep track of deployed repos!
    })
    .then(function(data) {
      return request(Helper.createRepoOpts(user.repos_url));
    })
    .then(function(resp){
      console.log('Github Limit Remaining: ', resp.headers['x-ratelimit-remaining']);
      var condensed = JSON.parse(resp.body)
        .map(function(repo) {
          return Helper.processRepo(repo, user.login);
        });

      console.log('condensed repo: ', condensed)
      return condensed;
    })
    .then(function(full_repo_list){

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

exports.getUserOrgs = function(user){
  return request(Helper.createOrgOpts(user.login, user.AccessToken))
  .then(function(org_list){
    var thing = JSON.parse(org_list.body)
    var orgList = thing
    console.log('orgList is: ', orgList)
    return orgList
  })
  .catch(function(err){
    console.log('error getting orgList: ', err)
  })
}

exports.getUserRepos = function(user, forceRequery){
  return exports.getUserOrgs(user).then((orgList) => {
    if(!Array.isArray(orgList)) {
      console.log('orgList GET Failed: ', orgList)
      return Promise.reject( new Error(orgList) )
    }
    return orgList.concat(user);
  })
  .then((list) => {
    console.log("list is: ", list)
    return Promise.map(list, list => exports.getIndividualRepos(list))
  })
  .then((nested) => {
    console.log("nested is: ", nested)
    return nested.reduce((a, b) => a.concat(b), [])
  })
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
      console.log("Error validating procfile: ", err)
      return false;
    });
}


