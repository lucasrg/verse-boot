var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Session', SessionSchema);
