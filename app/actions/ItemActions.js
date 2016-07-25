module.exports = function (ctx) {
  return {
    show: function (id) {
      setTimeout(function () {
        ctx.stores.Item.item = {id:id, name:'Item '+id};
        ctx.router.end({
          head: {title: ctx.i18n.Item.title(ctx.stores.Item.item)},
          body: 'ItemPage'
        })
      }, 1000)
    },
    edit: function (id) {
      if (id) {
        setTimeout(function () {
          ctx.stores.Item.item = {id:id, name:'Item '+id};
          ctx.router.end({
            head: {title: ctx.i18n.Item.title(ctx.stores.Item.item)},
            body: 'ItemEditorPage'
          })
        }, 1000)
      } else {
        ctx.stores.Item.item = {};
        ctx.router.end({
          head: {title: ctx.i18n.Item.title(ctx.stores.Item.item)},
          body: 'ItemEditorPage'
        })
      }

    },
    save: function (data) {
      ctx.stores.Item.saving = true;
      ctx.stores.Item.item.name = data.name;
      ctx.trigger('stores.Item.saving');
      setTimeout(function () {
        ctx.stores.Item.saving = false;
        ctx.trigger('stores.Item.saving');
        ctx.router.go(ctx.url.item.view(ctx.stores.Item.item));
      }, 1000)
    }
  }
}
