exports.checkListImage = function(data, version) {
  var result = data
    .filter(val => val.name.toLowerCase().replace(/ /g,'') === version.toLowerCase())[0].id;

  if(result.length > 0) {
    return Promise.resolve(result);
  }
  else {
    return Promise.reject( new Error('OS Name Not Found!') );
  }
}

// We can modify 'vps-ssd-1' here to look for different flavors or add a parameter.
exports.checkFlavorData = function(data) {
  return data
    .filter(val => val.name === "vps-ssd-1")[0].id;
}

exports.createInstanceObj = function(flavor, img, name, password) {
  var obj = {
    flavorId: flavor,
    'imageId': img,
    'monthlyBilling': false,
    'name': name,
    'region': 'BHS1',
    'userData': {
      password: password,
      chpasswd: { expire: false },
      ssh_pwauth: true
    }
  }

  return Promise.resolve(obj);
}
