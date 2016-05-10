const Global = require('./globals.js');


exports.sshInstallProxy = function() {
  return new Promise(function(resolve, reject) {
    console.log('starting sshInstallProxy')
    Global.io.emit('sshconn', 'starting ssh conn! (this msg from server yo)');

    Global.io.on('sshstart', function (socket) {
      console.log('sshsocket connected in sshInstallProxy!')
      console.log('sshsocket auth: ', socket.request.user.gitid)
      var consoleArray = [];

      var consoleProxy = new Proxy(consoleArray, {
        set: function(target, property, value, receiver) {
          console.log('Target: ', target)
          console.log('Property: ', property)
          console.log('Value: ', value)
          console.log('Receiver: ', receiver)
          if(typeof value !== 'number') {
            target.push(value);
            socket.emit('ssh', value);
          }
          
          return true;
        }
      });

      console.log('created proxy: ', consoleProxy)

      resolve(consoleProxy);

      if(socket.request.user.gitid) {
        console.log('resolving proxy listener active!');
        
      }
      else {
        reject('User Not Authed');
      }
    });
  })
}
