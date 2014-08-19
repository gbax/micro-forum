// Generated by CoffeeScript 2.0.0-beta8
window.App.Router = function (super$) {
  extends$(Router, super$);
  function Router() {
    super$.apply(this, arguments);
  }
  void 0;
  return Router;
}(Backbone.Router);
function isOwn$(o, p) {
  return {}.hasOwnProperty.call(o, p);
}
function extends$(child, parent) {
  for (var key in parent)
    if (isOwn$(parent, key))
      child[key] = parent[key];
  function ctor() {
    this.constructor = child;
  }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}
