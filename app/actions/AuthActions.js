module.exports = function (ctx) {
  return {
    show: function () {
      if (ctx.auth.user && ctx.request.pathname == ctx.url.auth()) {
        ctx.router.go(ctx.url.home());
      } else {
        ctx.router.end({
          head: { title: ctx.i18n.Auth.title },
          body: 'AuthPage'
        })
      }
    },
    grant: function (authorization) {
      //TODO Cookies
      ctx.auth = authorization;
    },
    revoke: function () {
      //TODO clear cookies
      ctx.auth = {};
    },
    signIn: function (data) {
      ctx.stores.Auth.loading = true;
      delete ctx.stores.Auth.failure;
      ctx.trigger('stores.Auth');
      ctx.api.post('/api/sign-in').send(data).end(function (err, res) {
        ctx.stores.Auth.loading = false;
        if (err) {
          ctx.stores.Auth.failure = res.body;
          ctx.trigger('stores.Auth');
        } else {
          ctx.actions.Auth.grant(res.body);
          ctx.router.reload();
        }
      })
    },
    signOut: function () {
      ctx.actions.Auth.revoke();
      ctx.router.reload();
    }
  }
}
