//Must be done every 30 days to connect app to OVH account.

var ovh = require('ovh')({
  endpoint: 'ovh-ca',
  appKey: process.env.OVH_APPKEY,
  appSecret: process.env.OVH_APPSECRET
});

ovh.request('POST', '/auth/credential', {
  'accessRules': [
    { 'method': 'GET', 'path': '/*'},
    { 'method': 'POST', 'path': '/*'},
    { 'method': 'PUT', 'path': '/*'},
    { 'method': 'DELETE', 'path': '/*'}
  ]
}, function (error, credential) {
  console.log(error || credential);
});