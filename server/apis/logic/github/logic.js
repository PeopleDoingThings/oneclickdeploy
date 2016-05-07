var Repo = require('../../../database/models/deployablerepos.js');

exports.save = function(gitid, data) {
  console.log("***   ***   ***   ***   ***   ***");
  console.log("logic.js -- data is: ", data);
  var repoObj = new Repo({
    deployed: false,
    deployerror: 'none',
    subdomain: 'none',
    repoid: String(data.id),
    ownerid: gitid,
    ownername: data.owner_name,
    name: data.name,
    age: Date.now(),
    clone_url: data.clone_url,
    procfile_url: data.procfile_url
  });

  return repoObj.save();
}

