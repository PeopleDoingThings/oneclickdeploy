var Repo = require('./models/deployablerepos.js');

exports.findRepoAndUpdate = function(id, updateObj) {
  Repo.find({ ownerid: id })
    .then(function(data) {
      return Repo.findByIdAndUpdate(data[0]._id, updateObj);
    })
}