var EnvDB = require('../../../database/env.js');

exports.postInstallSetup = function(repoData, loginData) {
  var repoURL = repoData.clone_url;
  var daemonToken = loginData.daemonkey;
  var repoFolder = repoURL.split('/');
  repoFolder = repoFolder[repoFolder.length - 1].replace('.git', '');

  var arrayStart = [
    'ls -l',
    'sudo su',
    'unalias -a',
    'pwd',
    'sudo -u mongod mongod --fork --logpath /var/log/mongodb/mongod.log',
    'cd /media/git',
    `git clone ${repoURL}`,
    'svn checkout https://github.com/PeopleDoingThings/oneclickdeploy/trunk/instance-monitor',
    'chown -R admin:admin *',
    `cd ${repoFolder}`,
    'su admin'
  ];

  var arrayMiddle = [];

  var arrayEnd = [
    'nvm use 5.11.0',
    'unalias -a',
    'git status',
    'npm install',     //likely want to change our timeout for this command & set it back again for others.
    'cat bower.json',
    'cat webpack.config.js',
    'cat knexfile.js | grep database',  //only look at first db. //look for production db in future releases.
    'cat Procfile',  
    'cd ../instance-monitor',
    'npm install',
    'export MONITOR_SYSTEM=instance',
    'ls -l',
    'svn update',
    `echo "module.exports = [${daemonToken}];" > 'token_list.js'`, //inject our token key.
    'forever start server/daemon.js',
    'forever list'
  ];

  console.log('repoData = ', repoData)
  return EnvDB.getEnv(repoData.repoid, repoData.ownerid)
    .then(function(data) {
      console.log('Environement Vars = ', data)

      data[0].variables.forEach( val => arrayMiddle.push(`export ${val.key}=${val.value}`) )  // Push our environement varibls in.
      return arrayStart.concat(arrayMiddle).concat(arrayEnd); // Concat our arrays together
    })
    .catch(function(err) {
      return arrayStart.concat(arrayEnd);
    })
}


exports.reinstallGitRepo = function (repoURL) {
  var array = [
    'ls -l',
    ''
  ];

  array.push(`wget ${repoURL}`)

  return array;
}