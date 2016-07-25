module.exports = {
  '/': function (ctx) {
    ctx.actions.Home.show();
  },
  '/item/?': function (ctx) {
    var id = ctx.request.params[0];
    //TODO ctx.actions.Item.show(id);
    ctx.router.end({
      head: {title: 'ITEM '+(id ? id : 'NEW')},
      body: 'pages/ItemPage'
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
