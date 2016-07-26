module.exports = {
  '/': function (ctx) {
    ctx.actions.Home.show();
  },
  '/item/?': function (ctx) {
    ctx.actions.Item.show(ctx.request.params[0]);
  },
  '/compose/item/?': function (ctx) {
    ctx.actions.Item.edit(ctx.request.params[0]);
  },
  '404': function (ctx) {
    ctx.router.end({
      status: 404,
      body: 'NotFoundPage'
    })
  },
  '500': function (ctx) {
    ctx.router.end({
      status: 500,
      body: 'ErrorPage'
    })
  }
}
