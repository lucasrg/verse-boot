module.exports = {
  cache: {},
  get: function (locale) {
    locale = locale || 'en';
    var bundle = this.cache[locale];
    if (!bundle) {
      bundle = require('../i18n/'+locale);
    }
    return bundle;
  }
}
