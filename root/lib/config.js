var _ = require('./utility');
var fs = require('fs');

var Config = function() {
	this.init.apply(this, _.toArray(arguments));
	return {
		'get': this.get.bind(this),
		'get_raw': this.get_raw.bind(this),
		'set': this.set.bind(this)
	};
};

_.extend(Config.prototype, {

	'init': function() {
		this.loadConfig();
	},

	'config': null,

	'getEnv': function() {
		if (process.env.NODE_ENV === 'production') {
			return 'production';
		} else if (process.env.NODE_ENV === 'test') {
			return 'test';
		} else {
			return 'dev';
		}
	},

	'loadConfig': function() {
		var config, envConfig;
		config = require(__dirname + '/../config.js');
		if (fs.existsSync(__dirname + '/../config.' + this.getEnv() + '.js')) {
			envConfig = require(__dirname + '/../config.' + this.getEnv() + '.js');
			config = _.merge(config, envConfig);
		}
		this.config = config;
	},

	'get': function(key) {
		var result;
		if (!key) {
			return _.cloneDeep(this.config);
		}
		result = _.getPath(this.config, key);
		if (!_.isObject(result) || _.isArray(result)) {
			return result;
		}
		return _.cloneDeep(result);
	},

	'get_raw': function(key) {
		return this.config[key];
	},

	'set': function(key, value) {
		var ks;
		if (!key) {
			throw 'No key specified.';
		}
		ks = key.split('.');
		this.config = _.setPath(this.config, value, ks);
	}

});

module.exports = new Config();