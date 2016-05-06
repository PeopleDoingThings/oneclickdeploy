var EnvDB = require('../../../database/env.js');

exports.getRepoFolder = function(repoData) {
  var repoObj = {
    repoURL: repoData.clone_url,
    repoFolder: repoData.clone_url.split('/')
  }

  repoObj.repoFolder = repoObj.repoFolder[repoObj.repoFolder.length - 1].replace('.git', '');

  return repoObj;
}

exports.addEnvirsToArray = function(repoData, arrayObj) {
  return EnvDB.getEnv(repoData.repoid, repoData.ownerid)
    .then(function(data) {
      if(data.length === 0) return Promise.reject( new Error('No Environement Variables Found') )

      data[0].variables.forEach( val => arrayObj.cmdsOne.push(`export ${val.key}=${val.value}`) )  // Push our environement varibls in.
      return arrayObj.cmdsZero.concat(arrayObj.cmdsOne).concat(arrayObj.cmdsTwo); // Concat our arrays together
    })
    .catch(function(err) {
      return arrayObj.cmdsZero.concat(arrayObj.cmdsTwo);
    })
}