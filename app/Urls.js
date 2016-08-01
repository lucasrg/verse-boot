module.exports = {
  static: function (path, version, ext) {
    return version ? '/static/'+path+'.'+version+'.'+ext : '/static/'+path;
  },
  auth: function () {
    return '/sign-in'
  },
  home: function () {
    return '/'
  },
  item: {
    view: function (item) {
      return '/item/'+item.id;
    },
    edit: function (item) {
      if (item) return '/edit/item/'+item.id;
      return '/edit/item/'
    }
  }
}
