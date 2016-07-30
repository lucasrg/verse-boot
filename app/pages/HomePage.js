var Link = require('../components/Link');
var ItemCard = require('../components/ItemCard');

module.exports = {
  tag:'div',
  class:'page.home',
  listen: ['stores.Home'],
  render: function (ctx) {
    return [
      {
        tag:'header',
        listen: ['stores.Auth'],
        render: function (ctx) {
          if (ctx.session.user) {
            var authButton = Link(ctx,{
              render:ctx.i18n.Auth.signOut,
              click: function () {
                ctx.actions.Auth.signOut();
              }
            })
          } else {
            var authButton = Link(ctx,{
              href:ctx.url.auth(),
              render:ctx.i18n.Auth.signIn
            })
          }
          return [authButton];
        }
      },
      {tag:'h1', render:ctx.i18n.Home.title},
      {tag:'div', class:'items', render:ctx.stores.Home.items.map(function (item) {
        return Link(ctx, {
          href: ctx.url.item.view(item),
          render: ItemCard(ctx, {item: item})
        })
      })}
    ]
  }
}
