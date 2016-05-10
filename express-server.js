const express = require('express');
const app = express();
const server = require('http').Server(app);
const Global = require('./server/globals/globals.js');
Global.io = require('socket.io')(server);
const ss = require('socket.io-stream');
const passportSocketIo = require('passport.socketio');


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

Global.io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,        // the same middleware you registrer in express
  key:          'ghv',               // the name of the cookie where express/connect stores its session_id
  secret:       sessionSecret,       // the session_secret to parse the cookie
  store:        store,               // we NEED to use a sessionstore. no memorystore please
  success:      onAuthorizeSuccess,
  fail:         onAuthorizeFail, 
}));

function onAuthorizeSuccess(data, accept){
  console.log('successful connection to socket.io');
  accept();
}

function onAuthorizeFail(data, message, error, accept) {
  console.log('socket.io auth err = ', error)
  console.log('socket.io auth message = ', message)
  if(error)
    accept(new Error(message));
  // this error will be sent to the user as a special error-package
  // see: http://socket.io/docs/client-api/#socket > error-object
}

Global.io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  if(socket.request.user.gitid) {
    console.log('socket user = ', socket.request.user)
    socket.emit('auth', `User ${socket.request.user.name} Authenticated!`)
  }
});

server.listen(process.env.PORT, function() {
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