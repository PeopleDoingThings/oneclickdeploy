// Repeating ourself here but the function calls would be a mess if we created the url inside them.
// top / forever / printenv

exports.commandObj = function(data, command) {
  var obj = {
    url: `http://${data.ip}:1492/statistics/${command}`,
    headers: {
      'parent-server-token': data.daemonkey
    }
  }

  return obj;
}

exports.pingObj = function(data) {
  var obj = {
    url: `http://${data.ip}:1492/statistics/uptime`,
    headers: {
      'parent-server-token': data.daemonkey
    }
  }

  return obj;
}