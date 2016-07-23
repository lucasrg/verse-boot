function isIE (userAgent) {
  var myNav = userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function isAndroid (userAgent) {
  var userAgent = userAgent.toLowerCase();
  return (userAgent && userAgent.indexOf('android') >= 0);
}

module.exports = function (userAgent) {
  return {
    ie: isIE(userAgent),
    android: isAndroid(userAgent)
  }  
}
