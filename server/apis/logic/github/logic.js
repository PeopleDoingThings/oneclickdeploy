var Repo = require('../../../database/models/deployablerepos.js');

exports.save = function(gitid, data) {
  var repoObj = new Repo({
    deployed: false,
    deployerror: 'none',
    repoid: String(data.id),
    ownerid: gitid,
    name: data.name,
    age: Date.now(),
    clone_url: data.clone_url,
    procfile_url: data.procfile_url
  });

  return repoObj.save();
}

