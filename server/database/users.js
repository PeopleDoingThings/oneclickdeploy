var mongoose = require('mongoose');
var User = require('../login/models/gituser.js');
// Set mongoose to use bluebirds promises.
mongoose.Promise = require('bluebird'); 

exports.saveUser = function(obj) {
	var userObj = new User({
		name: obj.name,
		id: obj.id
	});

	userObj.save().then(function(data) {
		console.log(data);
	})
}
