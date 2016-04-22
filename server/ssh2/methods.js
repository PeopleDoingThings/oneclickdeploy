var sequest = require('sequest');


// passObj takes in {password: pass}
exports.runCommandList = function(ip, user, passObj, cmdArray) {
  var seq = sequest(`${user}@${ip}`, passObj);

  seq.pipe(process.stdout);

  cmdArray.forEach(function(val) {
    seq.write(val);
  })

  seq.end();
}

// local & remote path are strings.
exports.writeRemoteFile = function(user, ip, remotepath, localpath) {
  var writer = sequest.put(`${user}@${ip}`, remotepath)
  fs.createReadStream(localpath).pipe(writer)
  writer.on('close', function () {
    // finished writing.
  })
}