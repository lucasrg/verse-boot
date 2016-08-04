var Item = require('../models/Item');

var ItemService = {
  serialize: function (item) {
    return {
      id: item._id,
      name: item.name,
      done : item.done
    }
  },
  create: function (data, cb) {
    new Item({
      name: data.name,
      done: data.done
    }).save(cb);
  },
  update: function (id, data, cb) {
    Item.findOneAndUpdate(
      { _id: id },
      {
        name: data.name,
        done: data.done
      }
    ).exec(cb);
  },
  delete: function (id, cb) {
    Item.remove({_id: id}, cb);
  },
  findOne: function (id, cb) {
    Item.findOne({_id: id}, cb);
  },
  find: function (cb) {
    Item.find().exec(cb);
  },
}

module.exports = ItemService;
