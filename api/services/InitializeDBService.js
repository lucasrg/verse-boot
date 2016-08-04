var Item = require('../models/Item');
var User = require('../models/User');

var InitializeDBService = {
  init: function () {
    User.findOne({
      username: 'test',
      password: '123'
    }).exec(function (err, existingsUser) {
      if (err) return console.error('Failed to create default user', err);
      if (existingsUser) return console.log('Default user already created.');
      var user = new User({
        username: 'test',
        password: '123',
        language: 'en'
      })
      user.save(function (err, user) {
        if (err) return console.error('Failed to create default user', err);
        console.log('Default user created:', user._id);
      })
    });

    Item.find().exec(function (err, items) {
      if (err) return console.error('Failed to create default items', err);
      if (items[0]) return console.log('Default items already created.');
      for (var i = 0; i < 20; i++) {
        new Item({
          name: 'Item '+i,
          done: i % 3 == 0
        }).save(function (err, item) {
          if (err) return console.error('Failed to create item', err);
          console.log('Default item created:', item._id);
        })
      }
    })

  }
}

module.exports = InitializeDBService;
