

exports.postInstallSetup = function(repoURL) {
  var array = [
    'ls -l',
    'yum update',

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