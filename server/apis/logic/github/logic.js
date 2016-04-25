var Repos = require('../../../database/models/deployedrepos.js');

exports.save = function(gitid, data) {
  console.log('saving repo! in github logic js: ', data);
  var repoObj = {
    deployed: true,
    repoid: data.id,
    ownerid: gitid,
    name: data.name,
    clone_url: data.clone_url,
    procfile_url: data.procfile_url
  }

  return Repos.save(repoObj);
}