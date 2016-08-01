var router = require('express').Router();
var AuthService = require('./services/AuthService');
var ItemService = require('./services/ItemService');

router.route('/sign-in/').post(function(req, res) {
  AuthService.signIn(req.body.username,req.body.password, function (err, data) {
    if (err) return res.status(400).json(err);
    res.json(data);
  })
});

router.use(function (req, res, next) {
  if (req.session) {
    next();
  } else {
    res.status(401).json({code:'401'});
  }
})

router.route('/items/:id').
  put(function (req, res) {
    res.json(ItemService.update(req.params.id, req.body));
  }).
  get(function (req, res) {
    console.log('REQUEST items', req.params);
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
