var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	password: String,
  language: String
});

module.exports = mongoose.model('User', UserSchema);
