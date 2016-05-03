var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Hat = require('hat');

//Import Routes
var LoginRoutes = require('./server/login/gitlogin.js');
var OVHRoutes = require('./server/apis/routes/ovhroutes.js');
var OpenStackRoutes = require('./server/apis/routes/openstackroutes.js');
var GitHubRoutes = require('./server/apis/routes/githubroutes.js');
var DatabaseRoutes = require('./server/apis/routes/dbroutes.js');
var SSH2Routes = require('./server/apis/routes/ssh2routes.js');
var DaemonRoutes = require('./server/apis/routes/daemonroutes.js');

// Makes sure express trusts the fowarded ips from Nginx & cloudflare while disabling the ExpressJS header.
app.enable('trust proxy');
app.disable('x-powered-by');

// MongoDB
mongoose.connect('mongodb://localhost/oneclickdb');

// Session Store
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/oneclickdb',
  collection: 'sessions'
});

store.on('error', function(error) {
  console.log('mstore error!', error);
});

// Auth Middleware - Make sure user is logged in before continuing.
var AuthUser = require('./server/login/authuser.js');

// Add sessions for passport to serialize & let us use get params with urlencoded.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  name: 'ghv',
  secret: Hat(),
  store: store,
  resave: false,
  proxy: true,
  cookie: { secure: 'auto' },
  saveUninitialized: false
}));

app.listen(process.env.PORT, function() {
	console.log(`Server Started on Port: ${process.env.PORT}!`);
});

//Run everything through passport before hitting our routes.
app.use(passport.initialize());
app.use(passport.session());

// Requests for files & pages go to express static. Handle the rest seperately on new Routers.

app.use('/', express.static('./dist'));

app.use('/login/', LoginRoutes);
app.use('/api/ovh/', AuthUser, OVHRoutes);
app.use('/api/openstack/', AuthUser, OpenStackRoutes);
app.use('/api/github/', AuthUser, GitHubRoutes);
app.use('/api/database', AuthUser, DatabaseRoutes);
app.use('/api/ssh2', AuthUser, SSH2Routes);
app.use('/api/daemon', AuthUser, DaemonRoutes);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/#/');
});