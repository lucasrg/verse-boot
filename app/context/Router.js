var Routes = require('../Routes');

module.exports = function (ctx) {
  return {
    history: [],
    events: {},
    go: function (url) {
      this.history.push(url);
      this.route();
    },
    back: function () {
      if (this.history.length > 1) {
        this.history.pop();
        this.route();
        return true;
      }
      return false;
    },
    route: function () {
      delete ctx.response;

      var url = this.history[this.history.length-1];

      var split = url.split('?');

      var query = {};
      if (split[1]) {
        var queryTokens = split[1].split('&');
        for (var i = 0; i < queryTokens.length; i++) {
          var keyValue = queryTokens[i].split('=');
          query[keyValue[0]] = decodeURIComponent(keyValue[1]);
        }
      }

      var pathname = split[0];
      var path = pathname.split('/');
      var params = [];
      var paramsKey = '';
      var route;

      while (path.length > 0) {
        var key = path.join('/') + paramsKey;
        if (!key) key = '/';
        route = Routes[key]
        if (route) {
          break;
        }
        paramsKey += '/?';
        params.unshift(path.pop());
      }

      if (!route) {
        route = Routes['404'];
      }

      if (route) {
        ctx.request.url = url;
        ctx.request.pathname = pathname;
        ctx.request.query = query;
        ctx.request.params = params;
        ctx.trigger('request');
        route(ctx);
      } else {
        this.end({status: 404});
      }

    },
    end: function (response) {
      ctx.response = response || {};
      ctx.response.head = ctx.response.head || { title: ctx.i18n.App.title};
      ctx.response.status = ctx.response.status || 200;
      ctx.trigger('response');
      if (this.events.end) this.events.end(ctx)
    },
    error: function (error) {
      this.end({
        status: 500,
        error: error,
        body: 'ErrorPage'
      })
    }
  }

}
