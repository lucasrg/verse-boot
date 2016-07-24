var Locales = require('../i18n/Locales');

module.exports = {
  cache: {},
  get: function (locale) {
    var bundle = this.cache[locale];
    if (!bundle) {
      bundle = require('../i18n/'+locale);
    }
    return bundle;
  },
  locale: function(value) {
    console.log('TESTNG', value);
    var match;
    if (value) {
      value.toLowerCase().split(';').forEach(function (v1) {
        v1.split(',').forEach(function (id) {
          id = id.replace('_','-');
          Locales.forEach(function(supported) {
            if (supported == id) {
              match = id
            } else if (!match && id.indexOf(supported) >= 0) {
              match = id;
            }
          });
        });
      });
    }

    return match || 'default';
  }

}
