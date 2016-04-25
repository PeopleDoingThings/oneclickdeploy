var express = require('express')
var Path = require('path')

var app = express()

const exec = require('child_process').exec;

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

app.get('/statistics/forever', function(req, res){

  command = 'forever list'

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error('error running forever list', err);
      res.send(err);
    } else {
      var response = stdout.split('\n').filter(line => line.length > 0)
      console.log("---------------------------------------------------------")
      console.log("- recieved request - /statistics/forever ; response:    -")
      console.log("---------------------------------------------------------")
      console.log(response);
      console.log("---------------------------------------------------------")
      res.json(response);
    }
  })
})

app.get('/statistics/uptime', function(req, res){

  command = 'uptime'

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error('error running uptime', err);
      res.send(err);
    } else {
      var response = stdout.split('\n').filter(line => line.length > 0)
      console.log("---------------------------------------------------------")
      console.log("- recieved request - /statistics/uptime ; response:    -")
      console.log("---------------------------------------------------------")
      console.log(response);
      console.log("---------------------------------------------------------")
      res.json(response);
    }
  })
})

// Parse incoming request bodies as JSON
app.use( require('body-parser').json() )

// Start the server!
var port = process.env.MONITOR_PORT || 1492
app.listen(port)
console.log("Listening on port", port)