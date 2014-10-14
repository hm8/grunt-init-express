var mongoose = require('mongoose');

var db_path = require('./config').get('mongo');
var fs = require('fs');
var path = require('path');

var dbs = {};

if (db_path) {
	fs.readdirSync(path.join(__dirname, '../', db_path, 'model')).forEach(function(file) {
		if (file.split('.').pop() === 'js') {
			require('../' + db_path + 'model/' + file);
		}
	});
	fs.readdirSync(path.join(__dirname, '../', db_path, 'lib')).forEach(function(file) {
		var fn = file.split('.');
		if (fn.length === 2 && fn[1] === 'js') {
			var key = fn[0][0].toUpperCase() + fn[0].substring(1);
			dbs[key] = require('../' + db_path + 'lib/' + file);
		}
	});
}

exports.Db = dbs;

exports.init = function(db) {
	mongoose.connect(db, function(err) {
		if (err) {
			console.error('connect to %s error: ', db, err.message);
			process.exit(1);
		}
	});
};

exports.close = function() {
	mongoose.connection.close();
};