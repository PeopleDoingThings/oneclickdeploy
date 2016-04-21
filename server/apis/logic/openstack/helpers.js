exports.computeEndpoint = 'https://compute.bhs1.cloud.ovh.net/v2/';
exports.imageEndpoint = 'https://image.compute.bhs1.cloud.ovh.net/';
exports.identityEndpoint = 'https://auth.cloud.ovh.net/v2.0';
exports.tenant_id = process.env.OPENSTACK_TENANTID;


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
  url: exports.identityEndpoint + '/tokens',
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