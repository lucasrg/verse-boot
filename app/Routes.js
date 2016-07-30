module.exports = {
  secure: {
    '/item/?': function (ctx) {
      ctx.actions.Item.show(ctx.request.params[0]);
    },
    '/compose/item/?': function (ctx) {
      ctx.actions.Item.edit(ctx.request.params[0]);
    }
  },
  '/': function (ctx) {
    ctx.actions.Home.show();
  },
  '/sign-in': function (ctx) {
    ctx.actions.Auth.show();
  },
  '401': function (ctx) {
    ctx.router.end({ status: 401, body: 'AuthPage' });
  },
  '404': function (ctx) {
    ctx.router.end({ status: 404, body: 'NotFoundPage' });
  },
  '500': function (ctx) {
    ctx.router.end({ status: 500, body: 'ErrorPage' });
  }
}
