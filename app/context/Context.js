var Urls = require('./Urls');
var Languages = require('./Languages');

module.exports = function (request) {
  var ctx = {};

  //TODO api
  //TODO actions
  //TODO stores

  ctx.url = Urls;

  if (request.cookies.session) {
    ctx.session = JSON.parse(request.cookies.session);
    ctx.i18n = Languages.get(session.locale);
  } else {
    ctx.i18n = Languages.get(request.locale);
  }

  ctx.request = request;
  ctx.response = {
    head: {
      title: ctx.i18n.App.title
    },
    status: 200
  };

  return ctx;
}
