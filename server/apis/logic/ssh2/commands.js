var CMDHelper = require('./cmdhelpers.js');


exports.postInstallSetup = function(repoData, loginData) {
  var repoObj = CMDHelper.getRepoFolder(repoData);
  var daemonToken = loginData.daemonkey;

  var arrayStart = [
    'ls -l',
    'sudo su',
    'unalias -a',
    'pwd',
    'sudo -u mongod mongod --fork --logpath /var/log/mongodb/mongod.log',
    'cd /media/git',
    `git clone ${repoObj.repoURL}`,
    'svn checkout https://github.com/PeopleDoingThings/oneclickdeploy/trunk/instance-monitor',
    'chown -R admin:admin *',
    `cd ${repoObj.repoFolder}`,
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

  // We can refactor this heavily. Using basically the exact same thing three times.
  return CMDHelper.addEnvirsToArray(repoData, {
    cmdsZero: arrayStart,
    cmdsOne: arrayMiddle,
    cmdsTwo: arrayEnd
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

exports.createRepoUpdateCmds = function(repoData) {
  console.log('createRepoUpdateCmds: ', repoData)
  var repoObj = CMDHelper.getRepoFolder(repoData);
  console.log('repoObj: ', repoObj)

  var cmdsZero = [
    `cd /media/git/${repoObj.repoFolder}`,
    'git checkout master',
    'git pull upstream master',
    'npm install',
    'webpack --progress'
  ];

  var cmdsOne = [];

  var cmdsTwo = [
    'forever stop 0',
    'cat Procfile'
  ];

  return CMDHelper.addEnvirsToArray(repoData, {
    cmdsZero: cmdsZero,
    cmdsOne: cmdsOne,
    cmdsTwo: cmdsTwo
  })
}

exports.reInstallRepo = function() {
  var repoObj = getRepoFolder(repoData);

  var commands = [
    `cd /media/git`,
    `rm -rf ${repoObj.repoFolder}`,

  ];

  return CMDHelper.addEnvirsToArray(repoData, {
    cmdsZero: cmdsZero,
    cmdsOne: cmdsOne,
    cmdsTwo: cmdsTwo
  })
}
