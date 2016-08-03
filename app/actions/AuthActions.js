
module.exports = function (ctx) {
  return {
    show: function () {
      if (ctx.session.user && ctx.request.pathname == ctx.urls.auth()) {
        ctx.router.go(ctx.urls.home());
      } else {
        ctx.router.render('AuthPage', ctx.i18n.Auth.title);
      }
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
          ctx.session.grant(res.body);
          ctx.router.reload();
        }
      })
    },
    signOut: function () {
      ctx.session.revoke();
      ctx.router.reload();
    }
  }
}
