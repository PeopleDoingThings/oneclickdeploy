// Repeating ourself here but the function calls would be a mess if we created the url inside them.

exports.commandObj = function(data, command) {
  var obj = {
    url: `${data.ip}/statistics/${command}`,
    header: {
      'parent-server-token': data.daemonkey
    }
  }

  return obj;
}

exports.pingObj = function(data) {
  var obj = {
    url: `${data.ip}/statistics/check`
    header: {
      'parent-server-token': data.daemonkey
    }
  }

  return obj;
}