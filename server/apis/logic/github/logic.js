var Repo = require('../../../database/models/deployablerepos.js');

exports.save = function(gitid, resp) {

  var result = resp.map(function(data) {
    var repoObj = new Repo({
      deployed: false,
      repoid: String(data.id),
      ownerid: gitid,
      name: data.name,
      clone_url: data.clone_url,
      procfile_url: data.procfile_url
    });

    return Repo.find({ repoid: String(data.id) })
      .then(function(data) {
        if(data.length === 0) {
          console.log('Saving New Repo Data!')
          return repoObj.save();
        }
        else {
          console.log('Getting Repo data from DB!', data)
          return data[0];
        }
      })
  })

  return Promise.all(result);
}

