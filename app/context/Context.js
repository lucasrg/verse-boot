var Actions = require('../Actions');
var Stores = require('../Stores');
var Urls = require('../Urls');

var Router = require('./Router');
var Languages = require('./Languages');

module.exports = function (request) {
  var ctx = {};

  //TODO api

  ctx.actions = {};
  Actions.forEach(function (name) {
    ctx.actions[name] = require('../actions/'+name+'Actions')(ctx);
  })

  ctx.stores = Stores();

  ctx.url = Urls;
  ctx.router = Router(ctx);

  if (request.cookies.session) {
    ctx.session = JSON.parse(request.cookies.session);
    ctx.i18n = Languages.get(session.locale);
  } else {
    ctx.i18n = Languages.get(request.locale);
  }

  ctx.request = request;

  return ctx;
}
