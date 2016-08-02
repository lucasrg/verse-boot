var Link = require('./Link');

module.exports = function (ctx) {
  return {
    tag:'header',
    listen: ['stores.Auth'],
    render: function (ctx) {
      if (ctx.session.user) {
        var authButton = [
          {tag:'b', render: ctx.session.user.username},
          Link(ctx,{
            render:{tag:'span', render: ctx.i18n.Auth.signOut},
            click: function () {
              ctx.actions.Auth.signOut();
            }
          })
        ]
      } else {
        var authButton = Link(ctx,{
          href:ctx.urls.auth(),
          render:ctx.i18n.Auth.signIn
        })
      }
      return [authButton];
    }
  }
}
