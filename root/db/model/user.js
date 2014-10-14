var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	no: String, //
	name: String,	//用户名
	pwd: String
});

mongoose.model('User', userSchema, 'user');