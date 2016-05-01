var Env = require('./models/env.js');

exports.getEnv = function(repoId, gitId) {
  return Env.find({ repoid: repoId, gitid: gitId })
    .then(function(data) {
      if(data.length === 0) {
        return Promise.reject( new Error('No Environment Variables Found!') );
      }

      return data;
    })
}

exports.saveNew = function(body, repoId, gitId) {
  var obj = new Env({
    variables: body,
    repoid: repoId,
    gitid: gitId
  })

  return obj.save();
}

exports.updateEnv = function(id, body, repoId, gitId) {
  return Env.findByIdAndUpdate(id, {
    variables: body,
    repoid: repoId,
    gitid: gitId
  })
}