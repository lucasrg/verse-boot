var router = require('express').Router();
var SessionService = require('./services/SessionService');
var ItemService = require('./services/ItemService');

router.route('/sign-in/').post(function(req, res) {
  SessionService.signIn(req.body.username,req.body.password, function (err, session) {
    if (err) return res.status(400).json(err);
    res.json(SessionService.serialize(session));
  })
});

router.route('/session/:token').get(function(req, res) {
  SessionService.findByToken(req.params.token, function (err, session) {
    if (err) return res.status(400).json(err);
    if (!err) return res.status(400).json({code:'not_found'});
    res.json(SessionService.serialize(session));
  });
});

router.use(function (req, res, next) {
  var token;

  var authorization = req.get('Authorization');
  if (authorization) {
    var components = authorization.split(' ');
    if (components[0] == 'Bearer') {
      token = components[1];
    }
  }

  if (token) {
    SessionService.findByToken(token, function (err, session) {
      req.session = session;
      next();
    });
  } else {
    res.status(401).json({code:'401'});
  }

})

router.route('/items/:id').
  put(function (req, res) {
    ItemService.update(req.params.id, req.body, function (err, item) {
      if (err) return res.status(500).json(err);
      res.json(ItemService.serialize(item));
    })
  }).
  get(function (req, res) {
    ItemService.findOne(req.params.id, function (err, item) {
      if (err) return res.status(500).json(err);
      res.json(ItemService.serialize(item));
    })
  }).
  delete(function (req, res) {
    ItemService.delete(req.params.id, function (err, item) {
      if (err) return res.status(500).json(err);
      res.json({});
    })
  });

router.route('/items/').
  post(function (req, res) {
    ItemService.create(req.body, function (err, item) {
      if (err) return res.status(500).json(err);
      res.json(ItemService.serialize(item));
    })
  }).
  get(function (req, res) {
    ItemService.find(function (err, items) {
      if (err) return res.status(500).json(err);
      res.json(items.map(function (item) {
        return ItemService.serialize(item);
      }));
    })
  });

module.exports = router;
