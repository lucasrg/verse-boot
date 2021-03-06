var Cookies = require('js-cookie');

var Session = function (credentials) {
  if (credentials) {
    this.active = true;
    this.token = credentials.token;
    this.user = credentials.user;
  } else {
    this.active = false;
  }
}

Session.prototype.serialize = function () {
  if (this.token) {
    return {
      token: this.token,
      user: this.user
    }
  }
}

Session.prototype.grant = function (credentials) {
  this.active = true;
  this.token = credentials.token;
  this.user = credentials.user;
  Cookies.set('session', this.token, { path:'/', expires: 90 });
  if (this.events && this.events.grant) {
    this.events.grant(this);
  }
};

Session.prototype.revoke = function () {
  this.active = false;
  delete this.token;
  delete this.user;
  Cookies.remove('session');
  if (this.events && this.events.revoke) {
    this.events.revoke(this);
  }
};

module.exports = Session;
