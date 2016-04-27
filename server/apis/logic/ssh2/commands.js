

exports.postInstallSetup = function(repoURL) {
  console.log('sshpostinstall repo url = ', repoURL)

  var array = [
    'ls -l',
    'sudo su',
    'unalias -a',
    'pwd',
    'sudo -u mongod mongod --fork --logpath /var/log/mongodb/mongod.log',
    'cd /media/git',
    'pwd',
    `git clone ${repoURL}`,
    'chown -R admin:admin *',
    'cd *',
    'su admin',
    'nvm use 5.11.0',
    'unalias -a',
    'git status',
    'npm install',
    'cat bower.json',
    'cat webpack.config.js',
    'cat Procfile',
    'ls'
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