var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Import Routes
var LoginRoutes = require('./server/login/gitlogin.js');
var OVHRoutes = require('./server/apis/routes/ovhroutes.js');
var OpenStackRoutes = require('./server/apis/routes/openstackroutes.js');
var GitHubRoutes = require('./server/apis/routes/githubroutes.js');

// MongoDB
mongoose.connect('mongodb://localhost/oneclickdb');

// Add sessions for passport to serialize & let us use get params with urlencoded.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'supersecretprojectsecret',
  resave: true,
  saveUninitialized: true
}));
app.listen(process.env.PORT, function() {
	console.log('Server Started on Port: ' + process.env.PORT + '!');
});

//Run everything through passport before hitting our routes.
app.use(passport.initialize());
app.use(passport.session());

// Requests for files & pages go to express static. Handle to rest seperately on new Routers.
app.use('/', express.static('./client'));
app.use('/login/', LoginRoutes);
app.use('/api/ovh/', OVHRoutes);
app.use('/api/openstack/', OpenStackRoutes);
app.use('/api/github/', GitHubRoutes);