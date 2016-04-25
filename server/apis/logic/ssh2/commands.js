

exports.postInstallSetup = function(repoURL, startCommand) {
  var array = [
    'ls -l',
    'yum update',
    'cd /media/git',
    `git clone ${repoURL}`,
    'cd *',
    'git status',
    'npm install',
    'bower install',
    `${startCommand}`,
    'forever list'
  ];

  array.push(`wget ${repoURL}`);

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