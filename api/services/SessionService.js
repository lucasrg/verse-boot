var UserService = require('./UserService');
var Session = require('../models/Session');

var SessionService = {
  serialize: function (session) {
    return {
      token: session._id,
      user: UserService.serialize(session.user)
    }
  },
  signIn: function (username, password, cb) {
    UserService.findByUsernameAndPassword(username, password, function (err, user) {
      if (err) return cb(err);
      if (!user) return cb({code:404});
      var session = new Session({ user: user });
      session.save(cb);
    })
  },
  findByToken: function (token, cb) {
    Session.
      findOne({ _id: token}).
      populate('user').
      exec(function (err, session) {
        if (err) return cb(err);
        if (!session) return cb({code:404});
        cb(null, session);
      });
  }
}

module.exports = SessionService;
