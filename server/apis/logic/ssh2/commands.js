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
  var vHost = `server {\r\n    listen 80;\r\n    server_name ${subdomain}.hyperjs.io;\r\n\r\n    resolver 8.8.8.8;\r\n    add_header Strict-Transport-Security \"max-age=31536000; includeSubdomains;\";\r\n    server_tokens off;\r\n    add_header X-Frame-Options SAMEORIGIN;\r\n    add_header X-Content-Type-Options nosniff;\r\n    add_header X-XSS-Protection \"1; mode=block\";\r\n\r\n    pagespeed on;\r\n    pagespeed XHeaderValue \"ngx_pagespeed\";\r\n\r\n    # needs to exist and be writable by nginx\r\n    pagespeed FileCachePath \/var\/ngx_pagespeed_cache;\r\n\r\n    location \/ {\r\n        proxy_pass ${ip};\r\n        proxy_http_version 1.1;\r\n        proxy_set_header X-Real-IP $remote_addr;\r\n        proxy_set_header Upgrade $http_upgrade;\r\n        proxy_set_header X-Forwarded-Proto $scheme;\r\n        proxy_set_header Host $http_host;\r\n        proxy_set_header X-NginX-Proxy true;\r\n        proxy_read_timeout 5m;\r\n        proxy_connect_timeout 5m;\r\n        proxy_set_header Connection \'upgrade\';\r\n        proxy_set_header Host $host;\r\n        proxy_redirect off;\r\n        proxy_set_header X-Forwarded-For $remote_addr;\r\n        proxy_cache_bypass $http_upgrade;\r\n      }\r\n\r\n        #error_page  404              \/404.html;\r\n\r\n        # redirect server error pages to the static page \/50x.html\r\n        #\r\n        error_page   500 502 503 504  \/50x.html;\r\n        location = \/50x.html {\r\n            root   html;\r\n        }\r\n\r\n        # proxy the PHP scripts to Apache listening on 127.0.0.1:80\r\n        #\r\n        #location ~ \\.php$ {\r\n        #    proxy_pass   http:\/\/127.0.0.1;\r\n        #}\r\n\r\n        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000\r\n        #\r\n        #location ~ \\.php$ {\r\n        #    root           html;\r\n        #    fastcgi_pass   127.0.0.1:9000;\r\n        #    fastcgi_index  index.php;\r\n        #    fastcgi_param  SCRIPT_FILENAME  \/scripts$fastcgi_script_name;\r\n        #    include        fastcgi_params;\r\n        #}\r\n\r\n        # deny access to .htaccess files, if Apache\'s document root\r\n        # concurs with nginx\'s one\r\n        #\r\n        #location ~ \/\\.ht {\r\n        #    deny  all;\r\n        #}\r\n    }`

  var commands = [
    'sudo su',
    'cd /etc/nginx/sites-available',
    `touch ${id}`,
    `echo ${vHost} > '${id}'`,
    'nginx -s reload'
  ]

  return commands;
}


exports.reinstallGitRepo = function (repoURL) {
  var array = [
    'ls -l',
    ''
  ];

  array.push(`wget ${repoURL}`)

  return array;
}