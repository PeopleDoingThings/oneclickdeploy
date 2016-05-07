var EnvDB = require('../../../database/env.js');
var Repo = require('../../../database/models/deployablerepos.js');
var InstanceLogin = require('../../../database/models/instancelogin.js');

exports.getRepoFolder = function(repoData) {
  console.log('getting repo folder = ', repoData)
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

exports.findDeployedRepoAndLoginData = function(userid) {
  var insLogin;
  var userRepo;
  return Repo.find({ ownerid: userid, deployed: true })
    .then(function(data) {
      if(data.length === 0) return Promise.reject( new Error('User has No Deployed Repo') )
      userRepo = data[0];
      return InstanceLogin.find({ ownergitid: userid });
    })
    .then(function(data) {
      if(data.length === 0) return Promise.reject( new Error('User has No Instances') )
      insLogin = data[0];

      return { insLogin: insLogin, userRepo: userRepo };
    })
}
  




