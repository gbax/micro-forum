// Generated by CoffeeScript 1.7.1
(function() {
  new App.Router();

  Backbone.history.start();

  App.messages = new App.Collections.Messages();

  App.messages.fetch().then(function() {
    return new App.Views.TopicForm({
      collection: App.messages
    });
  });

}).call(this);