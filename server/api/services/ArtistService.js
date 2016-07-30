var db = require('../db');

module.exports = {
  save: function (artist) {
    if (!artist.id) artist.id = db.generateId();
    db.artists[artist.id] = user;
  },
  delete: function (id) {
    delete db.artists[id];
  },
  find: function () {
    var result = [];
    Object.keys(db.artists).filter(function (id) {
      result.push(db.artists[id]);
    })
    return result;
  },
}
