var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')

var routes = express.Router();

const exec = require('child_process').exec;

//
// Provide a browserified file at a specified path
//
routes.get('/app-bundle.js',
  browserify('./client/app.js'))

//
// Example endpoint (also tested in test/server/index_test.js)
//
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'browserify', 'mithril'])
})

routes.get('/statistics/top', function(req, res){
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
});

var routes = express.Router()

})

//
// Static assets (html, etc.)
//
var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))


if (process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express()

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() )

  // Mount our main router
  app.use('/', routes)

  // Start the server!
  var port = process.env.MONITOR_PORT || 1492
  app.listen(port)
  console.log("Listening on port", port)
}
else {
  // We're in test mode; make this file importable instead.
  module.exports = routes
}
