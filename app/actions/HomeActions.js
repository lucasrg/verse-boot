module.exports = function (ctx) {
  return {
    show: function () {
      setTimeout(function () {
        ctx.stores.Home.items = []
        for (var i = 0; i < 30; i++) {
          ctx.stores.Home.items.push({id:i, name:'Item '+i})
        }
        ctx.router.end({
          head: {title: ctx.i18n.Home.title},
          body: 'HomePage'
        })
      }, 1000)
    }
  }
}
