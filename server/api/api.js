var router = require('express').Router();
var ArtistService = require('./services/ArtistService');
var AuthService = require('./services/AuthService');
var UserService = require('./services/UserService');

router.route('/sign-in/').post(function(req, res) {
  AuthService.signIn(req.body.username,req.body.password, function (err, data) {
    if (err) return res.status(400).json(err);
    res.json(data);
  })
});

router.use(function (req, res, next) {
  var authorization = req.get('Authorization');
  if (authorization) {
    var components = authorization.split(' ');
    if (components[0] == 'Bearer') {
      var token = components[1];
      var userId = db.authorization[token] >= 0;
      if (userId) {
        req.session = {
          token: token,
          user: db.users[userId]
        };
        next();
        return;
      }
    }
  }
  res.status(401).json({message:'Unauthorized'});
})

router.route('/artists/').
  post(function (req, res) {
    res.send(ArtistService.save(req.body));
  }).
  get(function (req, res) {
    res.send(ArtistService.find());
  })

module.exports = router;
