var express = require('express')
var Path = require('path')
var tokenList = require('../token_list.js')

var app = express()

const exec = require('child_process').exec;

app.use(function(req, res, next) {
  var parentToken = req.headers['parent-server-token']
  var validity = tokenList.indexOf(parentToken) !== -1

    console.log("--------------------------------------------")
    console.log("Request:")
    console.log("--------------------------------------------")
    console.log("tokenList: ", tokenList)
    console.log("--------------------------------------------")
    console.log("parentToken: ", parentToken)
    console.log("--------------------------------------------")
    console.log("validity: ", validity)
    console.log("--------------------------------------------")

  if (tokenList.indexOf(parentToken) === -1) {
    res.sendStatus(403)
  } else {
    next()
  }
})

app.get('/statistics/top', function(req, res){
  // set this environment on each instance
  if (process.env.MONITOR_SYSTEM !== 'instance') {
    // top on UNIX (OS X) is slightly different than top on Linux
    // This will probably need to be changed to run on an image
    topstring = 'top -l 1 -n 0'
  } else {
    topstring = 'top -n 1 -b | head -n 6' // get top of 'top' in centos
  }

  exec(topstring, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      var response = stdout.split('\n').filter(line => line.length > 0)
      console.log("---------------------------------------------------------")
      console.log("- recieved request for /statistics/top ; response:      -")
      console.log("---------------------------------------------------------")
      console.log(response);
      console.log("---------------------------------------------------------")
      res.json(response);
    }
  })
})

app.use(function(req, res, next) {
  var parentToken = req.headers['parent-server-token']
  var validity = tokenList.indexOf(parentToken) !== -1

    console.log("--------------------------------------------")
    console.log("Request:")
    console.log("--------------------------------------------")
    console.log("tokenList: ", tokenList)
    console.log("--------------------------------------------")
    console.log("parentToken: ", parentToken)
    console.log("--------------------------------------------")
    console.log("validity: ", validity)
    console.log("--------------------------------------------")

  if (tokenList.indexOf(parentToken) === -1) {
    res.sendStatus(403)
  } else {
    next()
  }
})


// Parse incoming request bodies as JSON
app.use( require('body-parser').json() )

// Start the server!
var port = process.env.MONITOR_PORT || 1492
app.listen(port)
console.log("Listening on port", port)