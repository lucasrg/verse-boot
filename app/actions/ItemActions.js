module.exports = function (ctx) {
  return {
    show: function (id) {
      ctx.api.get('/api/items/'+id).end(function (err, res) {
        if (err) return ctx.router.redirect(301, ctx.urls.home());
        ctx.stores.Item.item = res.body;
        ctx.router.render('ItemPage', ctx.i18n.Item.title(ctx.stores.Item.item))
      });
    },
    edit: function (id) {
      if (id) {
        ctx.api.get('/api/items/'+id).end(function (err, res) {
          if (err) return ctx.router.redirect(301, ctx.urls.home());
          ctx.stores.Item.item = res.body;
          ctx.router.render('ItemEditorPage', ctx.i18n.Item.title(ctx.stores.Item.item))
        });
      } else {
        ctx.stores.Item.item = {};
        ctx.router.render('ItemEditorPage', ctx.i18n.Item.title(ctx.stores.Item.item))
      }

    },
    save: function (data) {
      ctx.stores.Item.saving = true;
      ctx.trigger('stores.Item.saving');

      function saveCallback(err, res) {
        if (err) {
          ctx.stores.Item.saveError = err;
        }

        ctx.stores.Item.saving = false;
        ctx.trigger('stores.Item.saving');
        ctx.router.go(ctx.urls.item.view(ctx.stores.Item.item));
      }

      var id = ctx.stores.Item.item.id;
      if (id) {
        ctx.api.put('/api/items/'+id).send(data).end(saveCallback);
      } else {
        ctx.api.post('/api/items/').send(data).end(saveCallback);
      }
    },
    setDone: function (done) {
      ctx.stores.Item.item.done = done;
      ctx.trigger('stores.Item.done');
    }
  }
}
