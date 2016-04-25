var express = require('express');
var router = express.Router();
var Instance = require('../../database/instances');


router.get('/getuserinstances', function(req, res) {
  return Instance.getUserInstances(req.user.gitid)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.send(err.message);
    })

}



module.exports = router;