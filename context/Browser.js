module.exports = function (userAgent) {
  var ua = userAgent ? userAgent.toLowerCase() : '';
  return {
    ie: (ua.indexOf('msie') != -1) ? parseInt(ua.split('msie')[1]) : false,
    android: userAgent.indexOf('android') >= 0
  }
}
