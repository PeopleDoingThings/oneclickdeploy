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

// Need this string in userdata as its a cloudinit config allow us to set an ssh password.
exports.createInstanceObj = function(flavor, img, name, password) {
  var obj = {
    flavorId: flavor,
    'imageId': img,
    'monthlyBilling': false,
    'name': name,
    'region': 'BHS1',
    'userData': `#cloud-config\npassword: ${password}\nchpasswd: { expire: False }\nssh_pwauth: True`
  }

  return Promise.resolve(obj);
}

// Hard coding our expecatation here. Would want pass as arg in future.
exports.checkInstanceState = function(data) {
  var state = {};
  state.isReady = false;
  state.created = data.created;
  state.status = data.status;
  state.flavorid = data.flavor.id;
  state.imageid = data.image.id
  state.imagename = data.image.name;
  state.ip = {
    ip: data.ipAddresses[0].ip,
    type: data.ipAddresses[0].type
  }

  if( data.status === 'ACTIVE' && 
      data.flavor.id === '550757b3-36c2-4027-b6fe-d70f45304b9c' && 
      data.image.id === process.env.OVH_CUSTOMSNAPSHOT ) 
  {
    state.isReady = true;
  }

  console.log('state = ', state)

  return state;
}