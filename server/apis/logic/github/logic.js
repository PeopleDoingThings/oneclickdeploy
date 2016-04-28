var Repo = require('../../../database/models/deployablerepos.js');

exports.save = function(gitid, resp) {

  var result = resp.map(function(data) {
    var repoObj = new Repo({
      deployed: false,
      repoid: String(data.id),
      ownerid: gitid,
      name: data.name,
      age: Date.now(),
      clone_url: data.clone_url,
      procfile_url: data.procfile_url
    });

    return Repo.find({ repoid: String(data.id) })
      .then(function(data) {
        if(data.length === 0) {
          return repoObj.save();
        }
      })
  })

  return Promise.all(result);
}

