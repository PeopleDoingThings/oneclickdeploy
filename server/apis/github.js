var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);

exports.getUserRepos = function(user) {
  var repo_options = {
    url: 'https://api.github.com/users/' + user + '/repos?sort=updated',
    headers: {
      'User-Agent': 'peopleDoingThings/oneclickdeploy'
    }
  };

  return request(repo_options)
    .then(function(resp){
      var condensed = JSON.parse(resp.body)
        .map(function(repo) {
          var abbreviated = {};
            abbreviated.id = repo.id;
            abbreviated.name = repo.name;
            abbreviated.clone_url = repo.clone_url;
            abbreviated.procfile_url = 
              "https://raw.githubusercontent.com/{user}/{name}/master/Procfile"
                .replace("{user}", user)
                .replace("{name}", abbreviated.name)

            //console.log("Validating procfile: ", Promise.resolve(exports.validateProcfile(abbreviated.procfile_url)));

          return abbreviated;
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