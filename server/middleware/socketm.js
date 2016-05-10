const Global = require('../globals/globals.js');
const passportSocketIo = require('passport.socketio');

exports.socketAuth = function(cookieParser, sessionSecret, store) {
  Global.io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,        // the same middleware you registrer in express
    key:          'ghv',               // the name of the cookie where express/connect stores its session_id
    secret:       sessionSecret,       // the session_secret to parse the cookie
    store:        store,               // we NEED to use a sessionstore. no memorystore please
    success:      onAuthorizeSuccess,
    fail:         onAuthorizeFail 
  }));
}

function onAuthorizeSuccess(data, accept) {
  console.log('successful auth connection to socket.io');
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
  var id = socket.conn.id;
  
  console.log('socket conn id: ', socket.conn.id)

  Global.io.sockets.connected[`/#${id}`].emit('auth', 'emited to only your socket!');

  Global.io.sockets.connected[`/#${id}`].github = socket.request.user.gitid;

  console.log('clients connected github id = ', Global.io.sockets.connected[`/#${id}`].github);

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  if(socket.request.user.gitid) {
    console.log('socket user = ', socket.request.user)
    socket.emit('auth', `User ${socket.request.user.name} Authenticated!`)
  }
});