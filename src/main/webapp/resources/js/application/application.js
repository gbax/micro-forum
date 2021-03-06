// Generated by CoffeeScript 1.7.1
(function() {
  window.App = {
    Models: {},
    Views: {},
    Collections: {},
    Controllers: {},
    router: {}
  };

  window.vent = _.extend({}, Backbone.Events);

  window.App.template = function(id) {
    if ($('#' + id).length > 0) {
      return Handlebars.compile($('#' + id).html());
    } else {
      return null;
    }
  };

  window.App.getContextPath = function() {
    if ($("#contextPath").value) {
      return $("#contextPath").value;
    } else {
      return "";
    }
  };

}).call(this);
