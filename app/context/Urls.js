module.exports = {
  static: function (path, version, ext) {
    return version ? '/static/'+name+'.'+version+'.'+ext : '/static/'+name;
  },
}
