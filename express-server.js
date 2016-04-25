var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Import Routes
var LoginRoutes = require('./server/login/gitlogin.js');
var OVHRoutes = require('./server/apis/routes/ovhroutes.js');
var OpenStackRoutes = require('./server/apis/routes/openstackroutes.js');
var GitHubRoutes = require('./server/apis/routes/githubroutes.js');
var DatabaseRoutes = require('./server/apis/routes/dbroutes.js');

// MongoDB
mongoose.connect('mongodb://localhost/oneclickdb');

// Add sessions for passport to serialize & let us use get params with urlencoded.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'supersecretprojectsecret',
  resave: true,
  saveUninitialized: true
}));

app.listen(process.env.PORT, function() {
	console.log(`Server Started on Port: ${process.env.PORT}!`);
});

//Run everything through passport before hitting our routes.
app.use(passport.initialize());
app.use(passport.session());

// Requests for files & pages go to express static. Handle the rest seperately on new Routers.

app.use('/', express.static('./dist'));

app.use('/login/', LoginRoutes);
app.use('/api/ovh/', OVHRoutes);
app.use('/api/openstack/', OpenStackRoutes);
app.use('/api/github/', GitHubRoutes);
app.use('/api/database', DatabaseRoutes)

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/#/');
});

// app.use('*', function(req, res) {
//   res.redirect("/");
// });

// //rubix magic trick
// app.get('*', function(req, res, next) {
//   renderHTML(req, res, next);
// });

// var fs = require('fs');
// var path = require('path');

// global.window = global;
// global.navigator = {
//   userAgent: {
//     indexOf: function() {return true;},
//     toLowerCase: function() {
//       return "";
//     }
//   }
// };

// //window.$ = require('jquery');

// global.React = require('react');
// global.ReactRouter = require('react-router');

// var ReactDOMServer = require('react-dom/server');
// var routes = require('./dist/bundle.js');


// global.renderHTML = function(req, res, next, store) {
//   if(req.url === '/favicon.ico'
//     || (req.url.search('.l20n') !== -1)) return next();
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   var isRTL = req.cookies ? true : false;

//   var data = "";
//   if (store) {
//     data = escape(encodeURIComponent(JSON.stringify(store.getState())));
//   }

//   ReactRouter.match({
//     routes: routes({ listen: () => {} }),
//     location: req.url
//   }, function(err, redirectLocation, renderProps) {
//     if(err) {
//       res.status(500).send(err.message);
//     } else if(redirectLocation) {
//       res.redirect(redirectLocation.pathname + redirectLocation.search);
//     } else if(renderProps) {
//       var str = renderDOMString(store, data, renderProps);
//       if(isRTL) {
//         str = rtl.replace(new RegExp('{container}', 'g'), str);
//         str = str.replace(new RegExp('{server_data}', 'g'), data);
//         res.status(200).send(str);
//       } else {
//         str = ltr.replace(new RegExp('{container}', 'g'), str);
//         str = str.replace(new RegExp('{server_data}', 'g'), data);
//         res.status(200).send(str);
//       }
//     } else {
//       res.status(404).send('Not found');
//     }
//   });

