var Link = require('../components/Link');
var Form = require('../components/Form');

module.exports = {
  tag:'div',
  class:'page.auth',
  render: function (ctx) {
    return [
      {tag:'h1', render:ctx.i18n.Auth.title},
      Form(ctx, {
        listen: ['stores.Auth'],
        render: function (ctx) {
          return [
            {tag:'field', render:[
              {tag:'label', render:ctx.i18n.Auth.username},
              {tag:'input', name:'username'}
            ]},
            {tag:'field', render:[
              {tag:'label', render:ctx.i18n.Auth.password},
              {tag:'input', name:'password', type:'password'}
            ]},
            {tag:'field', render: [
              {tag:'input', type:'submit', value: ctx.i18n.Auth.signIn}
            ]},
            ctx.stores.Auth.failure ?
              {tag:'p', class:'error', render: ctx.i18n.Auth.errors[ctx.stores.Auth.failure.code]}
              :
              null
          ]
        },
        events: {
          submit: function (e, data) {
            ctx.actions.Auth.signIn({
              username: data.username,
              password: data.password
            });
          }
        }
      })
    ]
  }
}
