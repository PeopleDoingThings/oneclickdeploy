const express = require('express');
const app = express();
const server = require('http').Server(app);
const Global = require('./server/globals/globals.js');
Global.io = require('socket.io')(server);
const ss = require('socket.io-stream');
const socketMiddleware = require('./server/middleware/socketm.js');

const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Hat = require('hat');
const cookieParser = require('cookie-parser');

//Import Routes
const LoginRoutes = require('./server/login/gitlogin.js');
const OVHRoutes = require('./server/apis/routes/ovhroutes.js');
const OpenStackRoutes = require('./server/apis/routes/openstackroutes.js');
const GitHubRoutes = require('./server/apis/routes/githubroutes.js');
const DatabaseRoutes = require('./server/apis/routes/dbroutes.js');
const SSH2Routes = require('./server/apis/routes/ssh2routes.js');
const DaemonRoutes = require('./server/apis/routes/daemonroutes.js');
const sessionSecret = Hat();

// Makes sure express trusts the fowarded ips from Nginx & cloudflare while disabling the ExpressJS header.
app.enable('trust proxy');
app.disable('x-powered-by');

// MongoDB
mongoose.connect('mongodb://localhost/oneclickdb');

// Session Store
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/oneclickdb',
  collection: 'sessions'
});

store.on('error', function(error) {
  console.log('Mongo Store error!', error);
});

// Auth Middleware - Make sure user is logged in before continuing.
const AuthUser = require('./server/login/authuser.js');

// Add sessions for passport to serialize & let us use get params with urlencoded.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  name: 'ghv',
  secret: sessionSecret,
  store: store,
  resave: false,
  proxy: true,
  cookie: { secure: 'auto' },
  saveUninitialized: false
}));

// Setup our socket.io session middleware & listener that sets github id on connect to user socket.
socketMiddleware.socketAuth(cookieParser, sessionSecret, store);

server.listen(process.env.PORT, function() {
	console.log(`Server Started on Port: ${process.env.PORT}!`);
});

//Run everything through passport before hitting our routes.
app.use(passport.initialize());
app.use(passport.session());

// Requests for files & pages go to express static. Handle the rest seperately on new Routers.
if(process.env.ENV === 'production') app.use('/', express.static('./dist', { index: 'pindex.html' }));
else app.use('/', express.static('./dist'));

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