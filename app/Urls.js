module.exports = {
  static: function (path, version, ext) {
    return version ? '/static/'+path+'.'+version+'.'+ext : '/static/'+path;
  },
  home: function () {
    return '/'
  },
  item: function (item) {
    if (item) return '/item/'+item.id;
    return '/item/'
  }
}
