module.exports = {
  static: function (path, version, ext) {
    return version ? '/static/'+path+'.'+version+'.'+ext : '/static/'+path;
  },
}
