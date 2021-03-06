// Generated by CoffeeScript 2.0.0-beta8
void function () {
  var columns;
  window.App.Views.MainForm = function (super$) {
    extends$(MainForm, super$);
    function MainForm() {
      super$.apply(this, arguments);
    }
    MainForm.prototype.initialize = function () {
      var grid, paginator;
      window.App.topics = new window.App.Collections.Topics;
      grid = new Backgrid.Grid({
        events: {
          'click th a': function (e) {
            return $('th', $(this.el)).not($(e.target).parent()).removeClass('descending').removeClass('ascending');
          }
        },
        columns: columns,
        collection: window.App.topics
      });
      paginator = new Backgrid.Extension.Paginator({ collection: window.App.topics });
      $('#grid').append(grid.render().$el);
      $('#paginator').append(paginator.render().$el);
      window.App.topics.fetch({ reset: true });
      return new window.App.Views.AddTopic({ collection: window.App.topics });
    };
    columns = [
      {
        name: 'id',
        label: '\u041d\u043e\u043c\u0435\u0440',
        editable: false,
        cell: Backgrid.IntegerCell.extend({ orderSeparator: '' })
      },
      {
        name: 'description',
        label: '\u0424\u043e\u0440\u0443\u043c',
        editable: false,
        cell: Backgrid.UriCell.extend({
          render: function () {
            var formattedValue, rawValue;
            this.$el.empty();
            rawValue = '/topic/' + this.model.get('id');
            formattedValue = this.model.get('description');
            this.$el.append($('<a>', {
              tabIndex: -1,
              href: rawValue,
              title: formattedValue,
              target: '_self'
            }).text(formattedValue));
            this.delegateEvents();
            return this;
          }
        })
      },
      {
        name: 'updateDate',
        cell: 'string',
        label: '\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f',
        editable: false,
        sortable: true
      },
      {
        cell: 'id',
        label: '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435',
        editable: false,
        sortable: false,
        cell: Backgrid.Cell.extend({
          events: { click: 'removeModel' },
          removeModel: function (e) {
            var collection;
            e.preventDefault();
            collection = this.model.collection;
            return this.model.destroy({
              dataType: 'text',
              success: function (model, response) {
                return collection.renderOnDestroy();
              },
              error: function (model, response) {
                var resp;
                resp = JSON.parse(response.responseText);
                return window.location = window.App.getContextPath() + '/index?error=' + resp.error.error;
              }
            });
          },
          render: function () {
            var formattedValue;
            this.$el.empty();
            if (this.model.get('canDelete')) {
              formattedValue = '\u0423\u0434\u0430\u043b\u0438\u0442\u044c';
              this.$el.append($('<button>', {
                tabIndex: -1,
                type: 'button',
                'class': 'delete',
                title: formattedValue,
                target: this.target
              }).text(formattedValue));
              this.delegateEvents();
            }
            return this;
          }
        })
      }
    ];
    return MainForm;
  }(Backbone.View);
  window.App.Views.AddTopic = function (super$1) {
    extends$(AddTopic, super$1);
    function AddTopic() {
      super$1.apply(this, arguments);
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
  window.App.Views.TopicForm = function (super$2) {
    extends$(TopicForm, super$2);
    function TopicForm() {
      super$2.apply(this, arguments);
    }
    TopicForm.prototype.initialize = function () {
      var grid, paginator;
      window.App.messages = new window.App.Collections.Messages;
      grid = new Backgrid.Grid({
        events: {
          'click th a': function (e) {
            return $('th', $(this.el)).not($(e.target).parent()).removeClass('descending').removeClass('ascending');
          }
        },
        columns: this.columns,
        collection: window.App.messages
      });
      paginator = new Backgrid.Extension.Paginator({ collection: window.App.messages });
      $('#grid').append(grid.render().$el);
      $('#paginator').append(paginator.render().$el);
      window.App.messages.fetch({ reset: true });
      return new window.App.Views.AddMessage({ collection: window.App.messages });
    };
    TopicForm.prototype.columns = [
      {
        name: 'id',
        label: '\u041d\u043e\u043c\u0435\u0440',
        editable: false,
        cell: Backgrid.IntegerCell.extend({ orderSeparator: '' })
      },
      {
        name: 'message',
        cell: 'string',
        label: '\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435',
        editable: false,
        sortable: true
      },
      {
        name: 'date',
        cell: 'string',
        label: '\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f',
        editable: false,
        sortable: true
      },
      {
        cell: 'id',
        label: '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435',
        editable: false,
        sortable: false,
        cell: Backgrid.Cell.extend({
          events: { click: 'removeMessage' },
          removeMessage: function (e) {
            e.preventDefault();
            return this.model.destroy({
              dataType: 'text',
              error: function (model, response) {
                var resp;
                resp = JSON.parse(response.responseText);
                return window.location = window.App.getContextPath() + '/index?error=' + resp.error.error;
              }
            });
          },
          render: function () {
            var formattedValue;
            this.$el.empty();
            if (this.model.get('canDelete')) {
              formattedValue = '\u0423\u0434\u0430\u043b\u0438\u0442\u044c';
              this.$el.append($('<button>', {
                tabIndex: -1,
                type: 'button',
                'class': 'delete',
                title: formattedValue,
                target: this.target
              }).text(formattedValue));
              this.delegateEvents();
            }
            return this;
          }
        })
      }
    ];
    return TopicForm;
  }(Backbone.Model);
  window.App.Views.AddMessage = function (super$3) {
    extends$(AddMessage, super$3);
    function AddMessage() {
      super$3.apply(this, arguments);
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
    return AddMessage;
  }(Backbone.View);
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
}.call(this);
