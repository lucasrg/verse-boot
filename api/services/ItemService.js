var db = require('../db');

module.exports = {
  create: function (task) {
    item.id = db.generateId();
    db.items[item.id] = item;
  },
  update: function (id, item) {
    var existing = db.items[id];
    existing.name = item.name;
    existing.done = item.done;
  },
  delete: function (id) {
    delete db.items[id];
  },
  findOne: function (id) {
    return db.items[id];
  },
  find: function () {
    var result = [];
    Object.keys(db.items).forEach(function (id) {
      result.push(db.items[id]);
    })
    return result;
  },
}
