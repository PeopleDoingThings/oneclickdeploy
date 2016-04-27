// Working to be able to support environment variabls on deploy.

exports.postInstallSetup = function(repoURL, daemonToken) {
  var repoFolder = repoURL.split('/');
  repoFolder = repoFolder[repoFolder.length - 1].replace('.git', '');

  var array = [
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
    'su admin',
    'nvm use 5.11.0',
    'unalias -a',
    'git status',
    'npm install',     //likely want to change our timeout for this command & set it back again for others.
    'cat bower.json',
    'cat webpack.config.js',
    'cat Procfile',
    'cat knexfile.js | grep -i database',  //only look at first db. //look for production db in future releases.
    'cd ../instance-monitor',
    'npm install',
    'export MONITOR_SYSTEM=instance',
    'ls -l',
    'svn update',
    `echo "module.exports = [${daemonToken}];" > 'token_list.js'`, //inject our token key.
    'forever start server/daemon.js',
    'forever list'
  ];
  
  return array;
}


exports.reinstallGitRepo = function (repoURL) {
  var array = [
    'ls -l',
    ''
  ];

  array.push(`wget ${repoURL}`)

  return array;
}