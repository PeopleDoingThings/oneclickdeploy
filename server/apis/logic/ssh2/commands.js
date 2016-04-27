

exports.postInstallSetup = function(repoURL) {
  console.log('sshpostinstall repo url = ', repoURL)

  var array = [
    'ls -l',
    'sudo su',
    'unalias -a',
    'pwd',
    'yum update',
    'mongod --fork --logpath /media/log',
    'cd /media/git',
    'pwd',
    `git clone ${repoURL}`,
    'chown -R admin:admin *',
    'cd *',
    'su admin',
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