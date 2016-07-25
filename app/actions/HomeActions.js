module.exports = function (ctx) {
  return {
    show: function () {
      setTimeout(function () {
        ctx.stores.Home.items = [
          {id:1, name:'Item 1'},
          {id:2, name:'Item 2'},
        ]
        ctx.router.end({
          head: {title: ctx.i18n.Home.title},
          body: 'HomePage'
        })
      }, 1000)
    }
  }
}
