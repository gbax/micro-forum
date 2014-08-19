// Generated by CoffeeScript 2.0.0-beta8
window.App.Views.MainForm = function (super$) {
  extends$(MainForm, super$);
  function MainForm() {
    super$.apply(this, arguments);
  }
  MainForm.prototype.initialize = function () {
    var allTopics, topicForm;
    topicForm = new window.App.Views.AddTopic({ collection: window.App.topics }).render();
    allTopics = new window.App.Views.TopicsView({ collection: window.App.topics }).render();
    return $('#topicsTable').append(allTopics.el);
  };
  return MainForm;
}(Backbone.View);
window.App.Views.TopicsView = function (super$1) {
  extends$(TopicsView, super$1);
  function TopicsView() {
    super$1.apply(this, arguments);
  }
  TopicsView.prototype.initialize = function () {
    return this.collection.on('add', this.addOne, this);
  };
  TopicsView.prototype.tagName = 'tbody';
  TopicsView.prototype.render = function () {
    this.collection.each(this.addOne, this);
    return this;
  };
  TopicsView.prototype.addOne = function (topic) {
    var viewTopic;
    viewTopic = new window.App.Views.Topic({ model: topic });
    return this.$el.append(viewTopic.render().el);
  };
  return TopicsView;
}(Backbone.View);
window.App.Views.AddTopic = function (super$2) {
  extends$(AddTopic, super$2);
  function AddTopic() {
    super$2.apply(this, arguments);
  }
  AddTopic.prototype.initialize = function () {
    return this.descriptionEl = this.$('#description');
  };
  AddTopic.prototype.el = '#topicForm';
  AddTopic.prototype.events = { submit: 'addTopic' };
  AddTopic.prototype.addTopic = function (e) {
    e.preventDefault();
    this.collection.create({ description: this.descriptionEl.val() }, { wait: true });
    return this.clearForm();
  };
  AddTopic.prototype.clearForm = function () {
    return this.descriptionEl.val('');
  };
  return AddTopic;
}(Backbone.View);
window.App.Views.Topic = function (super$3) {
  extends$(Topic, super$3);
  function Topic() {
    super$3.apply(this, arguments);
  }
  Topic.prototype.initialize = function () {
    return this.model.on('destroy', this.unrender, this);
  };
  Topic.prototype.tagName = 'tr';
  Topic.prototype.events = { 'click a.delete': 'removeModel' };
  Topic.prototype.removeModel = function () {
    return this.model.destroy();
  };
  Topic.prototype.unrender = function () {
    return this.remove();
  };
  Topic.prototype.template = window.App.template('topicTemplate');
  Topic.prototype.render = function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  };
  return Topic;
}(Backbone.View);
window.App.Views.TopicForm = function (super$4) {
  extends$(TopicForm, super$4);
  function TopicForm() {
    super$4.apply(this, arguments);
  }
  TopicForm.prototype.initialize = function () {
    var addMessage, allMessages;
    addMessage = new window.App.Views.AddMessage({ collection: window.App.messages });
    allMessages = new window.App.Views.MessagesView({ collection: window.App.messages }).render();
    return $('#messagesTable').append(allMessages.el);
  };
  return TopicForm;
}(Backbone.Model);
window.App.Views.MessagesView = function (super$5) {
  extends$(MessagesView, super$5);
  function MessagesView() {
    super$5.apply(this, arguments);
  }
  MessagesView.prototype.initialize = function () {
    return this.collection.on('add', this.addOne, this);
  };
  MessagesView.prototype.tagName = 'tbody';
  MessagesView.prototype.render = function () {
    this.collection.each(this.addOne, this);
    return this;
  };
  MessagesView.prototype.addOne = function (message) {
    var viewMessage;
    viewMessage = new window.App.Views.Message({ model: message });
    return this.$el.append(viewMessage.render().el);
  };
  return MessagesView;
}(Backbone.View);
window.App.Views.AddMessage = function (super$6) {
  extends$(AddMessage, super$6);
  function AddMessage() {
    var instance$;
    instance$ = this;
    this.errSh = function (a, b, c, d) {
      return AddMessage.prototype.errSh.apply(instance$, arguments);
    };
    super$6.apply(this, arguments);
  }
  AddMessage.prototype.initialize = function () {
    return this.messageEl = this.$('#message');
  };
  AddMessage.prototype.el = '#messageForm';
  AddMessage.prototype.events = { submit: 'addMessage' };
  AddMessage.prototype.addMessage = function (e) {
    e.preventDefault();
    this.collection.create({ message: this.messageEl.val() }, { wait: true });
    return this.clearForm();
  };
  AddMessage.prototype.clearForm = function () {
    return this.messageEl.val('');
  };
  AddMessage.prototype.errSh = function (view, attr, error, selector) {
    return alert('fook');
  };
  return AddMessage;
}(Backbone.View);
window.App.Views.Message = function (super$7) {
  extends$(Message, super$7);
  function Message() {
    super$7.apply(this, arguments);
  }
  Message.prototype.initialize = function () {
    return this.model.on('destroy', this.unrender, this);
  };
  Message.prototype.tagName = 'tr';
  Message.prototype.events = { 'click a.delete': 'removeModel' };
  Message.prototype.removeModel = function () {
    return this.model.destroy();
  };
  Message.prototype.unrender = function () {
    return this.remove();
  };
  Message.prototype.template = window.App.template('messageTemplate');
  Message.prototype.render = function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  };
  return Message;
}(Backbone.View);
window.App.Views.PaginationView = function (super$8) {
  extends$(PaginationView, super$8);
  function PaginationView() {
    super$8.apply(this, arguments);
  }
  PaginationView.prototype.template = _.template($('#pagination-view').html());
  PaginationView.prototype.link = '';
  PaginationView.prototype.page_count = null;
  PaginationView.prototype.page_active = null;
  PaginationView.prototype.page_show = 5;
  PaginationView.prototype.attributes = { 'class': 'pagination' };
  PaginationView.prototype.initialize = function (params) {
    this.link = params.link;
    this.page_count = params.page_count;
    if (this.page_count <= this.page_show)
      this.page_show = this.page_count;
    return this.page_active = params.page_active;
  };
  PaginationView.prototype.render = function (eventName) {
    return console.log('rere');
  };
  return PaginationView;
}(Backbone.View.extend);
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
