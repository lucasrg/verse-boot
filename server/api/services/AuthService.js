var db = require('../db.js');
var UserService = require('./UserService');

module.exports = {
  signIn: function (username, password, cb) {
    var users = UserService.findByUsernameAndPassword(username, password);
    if (users[0]) {
      var token = db.generateId();
      db.authorization[token] = users[0];
      cb(null, {
        token: token,
        user: users[0]
      })
    }
    cb({code:404});
  }
}
