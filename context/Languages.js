module.exports = {
  cache: {},
  get: function (locales, value) {

    var match;
    if (value) {
      value.toLowerCase().split(';').forEach(function (v1) {
        v1.split(',').forEach(function (id) {
          id = id.replace('_','-');
          locales.forEach(function(supported) {
            if (supported == id) {
              match = id
            } else if (!match && id.indexOf(supported) >= 0) {
              match = id;
            }
          });
        });
      });
    }

    var locale = match || 'default';

    var bundle = this.cache[locale];
    if (!bundle) {
      bundle = require('../app/i18n/'+locale);
    }
    return bundle;
  }

}
