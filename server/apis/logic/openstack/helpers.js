exports.computeEndpoint = 'https://compute.bhs1.cloud.ovh.net/v2/';
exports.imageEndpoint = 'https://image.compute.bhs1.cloud.ovh.net/';
exports.identityEndpoint = 'https://auth.cloud.ovh.net/v2.0';
var InstanceLogin = require('../../../database/models/instancelogin.js');
var Hat = require('hat');
var base64 = require('base-64');

exports.createOpts = function(url) {
  var opt = {
    url: url,
    headers: {
      'X-Auth-Token': process.env.OPENSTACK_X_AUTH
    }
  };

  return opt;
}

exports.tokenOpts = {
  url: `${exports.identityEndpoint}/tokens`,
  json: {
    auth: {
      tenantName: process.env.OPENSTACK_TENANTNAME,
      passwordCredentials: {
        username: process.env.OPENSTACK_USERNAME,
        password: process.env.OPENSTACK_PASSWORD
      }
    }
  }
}

//ADD BACK process.evn
exports.createConsoleOpts = function(serverid) {
  var opt = {
    url: `${exports.computeEndpoint}${process.env.OPENSTACK_TENANTID}/servers/${serverid}/action`,
    json: {
      'os-getConsoleOutput': {
        'length': 50 
      }
    },
    headers: {
      'X-Auth-Token': process.env.OPENSTACK_X_AUTH
    }
  };

  return opt;
}

exports.createConsoleOpts = function(serverid) {
  var opt = {
    url: `${exports.computeEndpoint}${process.env.OPENSTACK_TENANTID}/servers/${serverid}/action`,
    json: {
      'os-getConsoleOutput': {
        'length': 50 
      }
    },
    headers: {
      'X-Auth-Token': process.env.OPENSTACK_X_AUTH
    }
  };

  return opt;
}

exports.createInstanceOpts = function(name, id, password) {
  var opt = {
    url: `${exports.computeEndpoint}${process.env.OPENSTACK_TENANTID}/servers`,
    json: {
      server: {
        name: name,
        user_data: base64.encode(`#cloud-config\npassword: ${password}\nchpasswd: { expire: False }\nssh_pwauth: True`),
        imageRef: `${process.env.OVH_CUSTOMSNAPSHOT}`,
        flavorRef: `${process.env.OVH_FLAVOR}`,
        metadata: {
            'Owner_ID': id
        }
      }
    },
    headers: {
      'X-Auth-Token': process.env.OPENSTACK_X_AUTH
    }
  };

  return opt;
}

exports.insertInstanceLogin = function(data) {
   var inlogin = new InstanceLogin({
    ownergitid: data.id,
    user: data.name,
    password: data.pass,
    sshuser: 'admin',
    daemonkey: Hat()
  })

  return inlogin.save().then(function(data) {
    console.log('saved instance login data = ', data);
    return data;
  })
}
