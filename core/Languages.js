var Locales = require('../app/Locales');

module.exports = {
  cache: {},
  get: function (value) {

    var match;
    if (value) {
      value.toLowerCase().split(';').forEach(function (v1) {
        v1.split(',').forEach(function (id) {
          id = id.replace('_','-');
          Locales.forEach(function(supported) {
            if (supported == id) {
              match = id
            } else if (!match && id.indexOf(supported) >= 0) {
              match = supported;
            }
          });
        });
      });
    }

    return match || 'default';
  }

}
