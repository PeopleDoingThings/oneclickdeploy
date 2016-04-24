var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// State is the state of deployment our instance is in. This lets is resume from a previous state on errors.
// The repos array contains objects which list the github repo url etc.
// The ownergitid is the github account who is associated with the deployment.
// We can update 'repos' using:
// db.update({'Searching criteria goes here'}, 
//   { $push : {
//     repos: {
//       "url": url,
//       "domain": 'mydomain.com'
//     } //inserted data is the object to be inserted 
//   }
// });


var Instance = new Schema({
  name: String,
  openstackid: String,
  ownergitid: String,
  state: {
    built: Boolean,
    customimage: Boolean,
    postinstall: Boolean,
    repos: { type : Array, "default" : [] }
  },
  creationdate: String,
  publicip: String,
  image: {
    flavorid: String,
    imageid: String,
    osname: String
  },
  ssh: {
    user: String,
    pass: String
  },
  region: String
});


module.exports = mongoose.model('Instance', Instance);