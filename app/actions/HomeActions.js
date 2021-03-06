module.exports = function (ctx) {
  return {
    show: function () {
      ctx.api.get('/api/items/').end(function (err, res) {
        if (err) return ctx.router.error(err);
        ctx.stores.Home.items = res.body;
        ctx.router.render('HomePage', ctx.i18n.Home.title);
      })
    },
    showUnauthorized: function () {
      ctx.stores.Home.items = [];
      ctx.router.render('HomePage', ctx.i18n.Home.title)
    }
  }
}
