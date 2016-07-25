module.exports = {
  static: function (path, version, ext) {
    return version ? '/static/'+path+'.'+version+'.'+ext : '/static/'+path;
  },
  home: function () {
    return '/'
  },
  item: {
    view: function (item) {
      return '/item/'+item.id;
    },
    edit: function (item) {
      if (item) return '/compose/item/'+item.id;
      return '/compose/item/'      
    }
  }
}
