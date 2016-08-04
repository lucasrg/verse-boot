'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var mongoose = require('mongoose');

var isProduction = process.env.NODE_ENV === 'production';
var port = process.env.API_PORT || 3010;
var mongoUrl = process.env.MONGO_URL || "mongodb://localhost/verse-boot";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (isProduction) {
  var compression = require('compression')
  app.use(compression());
}

app.use('/api', require('./api'));

module.exports = {
  listen: function () {
    server.listen(port, function () {
      console.info('API Server running on port ' + port);
      mongoose.connect(mongoUrl);

      // Create a default user
      require('./services/InitializeDBService').init();
    });
  }
};
