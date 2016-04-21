var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);

exports.getUserRepos = function(user) {

  var options = {
    url: 'https://api.github.com/users/' + user + '/repos',
    headers: {
      'User-Agent': 'peopleDoingThings/oneclickdeploy'
    }
  };

  var url = "https://api.github.com/users/" + user + "/repos"

  return request(options)
    .then(function(data){
      console.log("/server/api/routes/github.js line 11 - GOT REPO DATA")
      return data;
    })
    .catch(function(err) {
      console.log("/server/api/routes/github.js line 15 - ERROR: ", err)
      return err;
    })
}