var db = require('../db.js');
var UserService = require('./UserService');

module.exports = {
  signIn: function (username, password, cb) {
    var users = UserService.findByUsernameAndPassword(username, password);
    if (users[0]) {
      var token = db.generateId();
      db.sessions[token] = {
        token: token,
        user: users[0]
      };
      cb(null, db.sessions[token]);
    } else {
      cb({code:404});
    }
  },
  findByToken: function (token, cb) {
    if (db.sessions[token]) {
      cb(null, db.sessions[token])
    } else {
      cb({code: '404'})
    }
  }
}
