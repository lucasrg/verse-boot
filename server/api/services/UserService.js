var db = require('../db');

var UserService = {
  serialize: function (user) {
    return {
      id: user.id,
      username: user.usernae
    }
  },
  save: function (user) {
    if (!user.id) user.id = db.generateId();
    return UserService.serialize(user);
  },
  delete: function (id) {
    delete db.users[id];
  },
  findByUsernameAndPassword: function (username, password) {
    var result = [];
    Object.keys(db.users).forEach(function (id) {
      var user = db.users[id];
      if (user.username == username && user.password == password) {
        result.push(UserService.serialize(user));
      }
    })
    return result;
  },
}

module.exports = UserService;
