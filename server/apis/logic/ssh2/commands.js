

exports.postInstallSetup = function(repoURL) {
  var array = [
    'ls -l',
    'echo $(pwd)',
    'yum update',
    'cd /media/git',
    'echo $(pwd)',
    `git clone ${repoURL}`,
    'cd *',
    'git status',
    'npm install',
    'ls -a | grep -i bower.json',
    'ls -a | grep -i webpack.config.js',
    'cat Procfile | grep -i web:\ node',
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