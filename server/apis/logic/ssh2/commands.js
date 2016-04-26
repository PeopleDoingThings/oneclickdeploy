

exports.postInstallSetup = function(repoURL) {
  console.log('sshpostinstall repo url = ', repoURL)

  var array = [
    'ls -l',
    'sudo su',
    'pwd',
    'yum update',
    'npm install webpack -g',
    'npm install bower -g',
    'cd /media/git',
    'pwd',
    `git clone ${repoURL}`,
    'chown -R admin:admin *',
    'cd *',
    'su admin',
    'git status',
    'npm install',
    'ls -a | grep -i bower.json',
    'ls -a | grep -i webpack.config.js',
    'cat Procfile | grep -i "web:\ node"',
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