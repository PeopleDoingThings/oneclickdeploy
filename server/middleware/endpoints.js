var request = require('request');

//backend frontent endpoints relationships

//Need some sort of checking script that can tell you if the req.user owns a specific instance etc.

request.get('/requestdeployment', function() {
  // req.query.githuburl
  
  // Returns if deployment starts succesfully

  // Starts up a new instance installs custom image then ssh into instance and setup github etc.
})

request.get('/getloggedinuserrepos', function() {
  // No need for params etc.. req.user
  // Check for req.user & use this obj to get name
  // Call to github to get repos  https://api.github.com/username/repos
  // Filter that response to public non-forked repos.
  // Map across list of repos looking for procfiles & then check if proc file matches valid syntax
  // Now store all valid repos in db. There is going to have to be some procsessing of these objects to strip out valid information.
    // names / https urls / giturls etc.... store some timestamps etc.
  // Return this valid reposlist to frontend. Array of objs that had keys of reposname & repo url & github repo id & procvalid: true etc...
});

request.get('/deploymentstatus', function() {
  // Make decision here to show dashboard or reposlist based on if anything is deployed
  // Returns a list of repos that are either deployed or pending deployment.
  // Returns also a repo id if deployed else go to reposlist of their github acc and make api call.

  // Sending back deployment log which is checked on frontend x seconds.
});

request.get('/deploymentdata', function() {
  //req.query.repoid

  // Returns stats such as ip name of repo bla bla
  // OS Data
  // Data created
  // Etc
  // Returns instance ids 
});

request.get('/deploymentmonitoring', function() {
  // req.query.instanceid
  // Returns monitoring data for cpu/memoryusage/network usage
  // Returns an obj with cpu/mem/net keys each containing data over time for the last 24 hours.
})

request.get('/nodeserverstatus', function() {
  // req.query.instanceid
  // returns uptime / log optionally & other forever stuff like id / psid
})

request.get('/instancemonitors', function() {
  // req.query.instanceid
  // PINGS DATA / uptimemonitors / pings.js
  // Regular ping every 5 mins
  // curl get port 80 for server
  // check ssh port responds.
})

request.get('/showbackupsavaliable', function() {
  // MAYBE
  // req.query.instanceid
})




request.post('/restartinstance', function() {
  // takes instance id & check for req.user owns this instance

})
request.post('/deleteinstance', function() {
  // takes instance id & check for req.user owns this instance

})
request.post('/snapshotinstance', function() {
  // takes instance id & check for req.user owns this instance
  // (MAYBE TIME PERMITTING)
})
request.post('/shutdowninstance', function() {
  // takes instance id & check for req.user owns this instance
  // or pause.
})


