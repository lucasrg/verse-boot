var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	name: String,
	done: Boolean
});

module.exports = mongoose.model('Item', ItemSchema);
