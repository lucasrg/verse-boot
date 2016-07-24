module.exports = {
  '/': function (ctx) {
    //TODO ctx.actions.Home.show();
    ctx.router.end({
      head: {title: 'HOME!'}
    })
  },
  '/items/?': function (ctx) {
    var id = ctx.request.params[0];
    //TODO ctx.actions.Item.show(id);
    ctx.router.end({
      head: {title: 'ITEM '+(id ? id : 'NEW')}
    })
  },
  '500': function (ctx) {
    //TODO
    ctx.router.end({status: 500});
  },
  '404': function (ctx) {
    //TODO
    ctx.router.end({status: 404});
  }
}
