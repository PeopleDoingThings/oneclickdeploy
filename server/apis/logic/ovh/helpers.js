exports.checkListImage = function(data, version) {
  var result = '';

  data.forEach(function(val) {
    if(val.name.toLowerCase().replace(/ /g,'') === version.toLowerCase()) {
      result = val.id;
    }
  })

  if(result.length > 0) {
    return Promise.resolve(result);
  }
  else {
    return Promise.reject( new Error('OS Name Not Found!') );
  }
}

exports.checkFlavorData = function(data) {
  return data
    .filter(val => val.name === "vps-ssd-1")
    .map(val => val.id);
}