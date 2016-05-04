var EnvDB = require('../../../database/env.js');

exports.postInstallSetup = function(repoData, loginData) {
  var repoURL = repoData.clone_url;
  var daemonToken = loginData.daemonkey;
  var repoFolder = repoURL.split('/');
  repoFolder = repoFolder[repoFolder.length - 1].replace('.git', '');

  var arrayStart = [
    'ls -l',
    'sudo su',
    'unalias -a',
    'pwd',
    'sudo -u mongod mongod --fork --logpath /var/log/mongodb/mongod.log',
    'cd /media/git',
    `git clone ${repoURL}`,
    'svn checkout https://github.com/PeopleDoingThings/oneclickdeploy/trunk/instance-monitor',
    'chown -R admin:admin *',
    `cd ${repoFolder}`,
    'su admin'
  ];

  var arrayMiddle = [];

  var arrayEnd = [
    'nvm use 5.11.0',
    'unalias -a',
    'git status',
    'export NODE_ENV=production',
    'export ENV=production',
    'npm install',     //likely want to change our timeout for this command & set it back again for others.
    'cat bower.json',
    'cat webpack.config.js',
    'cat knexfile.js | grep database',  //only look at first db. //look for production db in future releases.
    'cat Procfile',  
    'cd ../instance-monitor',
    'npm install',
    'export MONITOR_SYSTEM=instance',
    'ls -l',
    'svn update',
    `echo "module.exports = [${daemonToken}];" > 'token_list.js'`, //inject our token key.
    'forever start server/daemon.js',
    'forever list'
  ];

  console.log('repoData = ', repoData)
  return EnvDB.getEnv(repoData.repoid, repoData.ownerid)
    .then(function(data) {
      console.log('Environement Vars = ', data)

      data[0].variables.forEach( val => arrayMiddle.push(`export ${val.key}=${val.value}`) )  // Push our environement varibls in.
      return arrayStart.concat(arrayMiddle).concat(arrayEnd); // Concat our arrays together
    })
    .catch(function(err) {
      return arrayStart.concat(arrayEnd);
    })
}

exports.addNewVirtualHost = function(id, subDomain, ip) {
  var vHost = `server {
      listen 80;
      server_name ${subDomain}.hyperjs.io;

      resolver 8.8.8.8;
      server_tokens off;
      add_header X-Frame-Options SAMEORIGIN;
      add_header X-Content-Type-Options nosniff;

      pagespeed on;
      pagespeed XHeaderValue "ngx_pagespeed";

      # needs to exist and be writable by nginx
      pagespeed FileCachePath /var/ngx_pagespeed_cache;

      location / {
        proxy_pass http://${ip};
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_read_timeout 5m;
        proxy_connect_timeout 5m;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_redirect off;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_cache_bypass $http_upgrade;
      }

      error_page   500 502 503 504  /50x.html;
      location = /50x.html {
        root html;
      }
    }`;

  var commands = [
    'ls -l',
    'sudo su',
    'unalias -a',
    'cd /etc/nginx/sites-available',
    'pwd',
    `touch ${id}`,
    `echo "${vHost}" > '${id}'`,
    'nginx -s reload'
  ];

  return commands;
}


