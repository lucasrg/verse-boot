var User = require('../models/User');

var UserService = {
  serialize: function (user) {
    return {
      id: user._id,
      username: user.username
    }
  },
  findByUsernameAndPassword: function (username, password, cb) {
    User.find({
      username: username,
      password: password
    }).exec(function (err, users) {
      if (err) return cb(err);
      cb(null, users ? users[0] : null);
    });
  }
}

module.exports = UserService;
