var router = require('express').Router();
var SessionService = require('./services/SessionService');
var ItemService = require('./services/ItemService');

router.route('/sign-in/').post(function(req, res) {
  SessionService.signIn(req.body.username,req.body.password, function (err, data) {
    if (err) return res.status(400).json(err);
    res.json(data);
  })
});

router.route('/session/:token').get(function(req, res) {
  SessionService.findByToken(req.params.token, function (err, session) {
    res.json(session);
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
    res.json(ItemService.update(req.params.id, req.body));
  }).
  get(function (req, res) {
    res.json(ItemService.findOne(req.params.id));
  }).
  delete(function (req, res) {
    res.json(ItemService.delete(req.params.id));
  });

router.route('/items/').
  post(function (req, res) {
    res.json(ItemService.create(req.body));
  }).
  get(function (req, res) {
    res.json(ItemService.find());
  });

module.exports = router;
