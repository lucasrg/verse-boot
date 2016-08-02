module.exports = function (ctx, routes) {
  return {
    history: [],
    events: {},
    go: function (url) {
      if (!url) throw Error('[router] invalid url');
      var newState = { url: url }
      if (this.events.go) {
        var oldState = this.history[this.history.length-1];
        if (oldState) this.events.go(oldState, newState, ctx);
      }
      this.history.push(newState);
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
    reload: function () {
      this.route();
    },
    route: function () {
      delete ctx.response;

      var history = this.history[this.history.length-1];

      var split = history.url.split('?');

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
      var publicRoute;

      while (path.length > 0) {
        var key = path.join('/') + paramsKey;
        if (!key) key = '/';

        if (routes.secure && routes.secure[key]) {
          route = routes.secure[key];
          publicRoute = routes[key];
          var isSecuredRoute = true;
        } else {
          route = routes[key]
        }
        if (route) {
          break;
        }
        paramsKey += '/?';
        params.unshift(path.pop());
      }

      if (!route) {
        route = routes['404'];
      } else if (isSecuredRoute && !ctx.session.active) {
        route = publicRoute || routes['401'] || routes['404'];
      }

      if (route) {
        ctx.request.url = history.url;
        ctx.request.pathname = pathname;
        ctx.request.query = query;
        ctx.request.params = params;
        ctx.request.history = history;
        ctx.trigger('request');
        route(ctx);
      } else {
        this.end({status: 404});
      }

    },
    end: function (body, head) {
      ctx.response = {body: body};
      ctx.response.head = head || { title: ctx.i18n.App.title };
      ctx.response.status = ctx.response.status || 200;
      ctx.response.history = ctx.request.history;
      ctx.trigger('response');
      if (this.events.end) this.events.end(ctx)
    },
    redirect: function (status, url) {
      this.end({
        status: status,
        redirect: url
      })
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
