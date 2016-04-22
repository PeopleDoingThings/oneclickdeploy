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

