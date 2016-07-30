var superagent = require('superagent');

var API = function (ctx, options) {
  options = options || {};
  this.ctx = ctx;
  this.host = options.host || '';
  this.sendDate = options.sendDate;
  this.events = {};
}

function callback(err, res){
  if (this._api.events.end) {
    this._api.events.end(err, res);
  }
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

function inject(request) {
  request._api = this;
  request.callback = callback;
  if (this.ctx.session.token) {
    request.set('Authorization','Bearer '+this.ctx.session.token);
  }
  request.set('X-Requested-With', 'XMLHttpRequest');
  request.set('Expires', '-1');
  request.set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private');
  if (this.sendDate) {
    request.query(Date.now().toString());
  }
}

API.prototype.get = function(path) {
  return superagent.get(this.host+path).use(inject.bind(this));
}

API.prototype.post = function(path) {
  return superagent.post(this.host+path).use(inject.bind(this));
}

API.prototype.put = function(path) {
  return superagent.put(this.host+path).use(inject.bind(this));
}

API.prototype.delete = function(path) {
  return superagent.delete(this.host+path).use(inject.bind(this));
}

module.exports = API;
