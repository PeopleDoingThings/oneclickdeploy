exports.processRepo = function(repo, user) {
  var abbreviated = {};
  abbreviated.id = repo.id;
  abbreviated.name = repo.name;
  abbreviated.clone_url = repo.clone_url;
  abbreviated.procfile_url = 
    "https://raw.githubusercontent.com/{user}/{name}/master/Procfile"
      .replace("{user}", user)
      .replace("{name}", abbreviated.name)

  return abbreviated;
}

exports.createRepoOpts = function(user) {
  var repo_options = {
    url: `https://api.github.com/users/${user}/repos?sort=updated&client_id=${process.env.GITHUB_QUERY_CLIENTID}&client_secret=${process.env.GITHUB_QUERY_CLIENTSECRET}`,
    headers: {
      'User-Agent': 'peopleDoingThings/oneclickdeploy'
    }
  };

  return repo_options;
}

exports.createProcOpts = function(procfile_url) {
  var procfile_options = {
    url: procfile_url,
    headers: {
      'User-Agent': 'peopleDoingThings/oneclickdeploy'
    }
  };

  return procfile_options;
}