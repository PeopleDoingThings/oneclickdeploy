var express = require('express');
var router = express.Router();
var Github = require('../github.js');
var Logic = require('../logic/github/logic.js');

// These routes are relative to the mounted router. Therefore '/' here is actaully '/api/github'.

router.get('/repos', function(req, res) {
  console.log('Logged In GitHub User: ', req.user && req.user.login)
  var username = req.user && req.user.login || 'plynch';

  Github.getUserRepos(username)
    .then(function(resp) {
      console.log('got repos! = ', resp)
      Logic.save('512480', resp)  // replace string here with req.user.gitid
        .then(function(data) {
          console.log('==== githubroutes data ==== ', data);
        })
        .catch(function(err) {
          console.log('githubroutes err = ', err);
        })

      res.send(resp);
    })
    .catch(function(err) {
      res.send(err);
    })
})

router.get('/validate', function(req, res) {
  
})


module.exports = router;