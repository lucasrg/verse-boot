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
    } else {
      cb({code:404});
    }
  },
  findByToken: function (token, cb) {
    if (db.authorization[token]) {
      cb(null, {
        token: token,
        user: db.authorization[token]
      })
    } else {
      cb({code: '404'})
    }
  }
}
