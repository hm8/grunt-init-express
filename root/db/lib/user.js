var User = require('mongoose').model('User');

exports.search = function(name, cb) {
	User.findOne({
		name: name
	}, cb);
};

exports._ = User;