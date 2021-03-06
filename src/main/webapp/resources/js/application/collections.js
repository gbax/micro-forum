// Generated by CoffeeScript 1.7.1

/*
Topics
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.App.Collections.Topics = (function(_super) {
    __extends(Topics, _super);

    function Topics() {
      return Topics.__super__.constructor.apply(this, arguments);
    }

    Topics.prototype.model = window.App.Models.Topic;

    Topics.prototype.initialize = function() {
      return this.on('add', this.fetchTopics, this);
    };

    Topics.prototype.url = '/topics';

    Topics.prototype.state = {
      pageSize: 5
    };

    Topics.prototype.queryParams = {
      totalPages: null,
      totalRecords: null,
      sortKey: "sort"
    };

    Topics.prototype.parseState = function(resp, queryParams, state, options) {
      return {
        totalRecords: resp.total_page
      };
    };

    Topics.prototype.parseRecords = function(resp, options) {
      return resp.items;
    };

    Topics.prototype.fetchTopics = function(e) {
      return this.fetch({
        reset: true
      });
    };

    Topics.prototype.renderOnDestroy = function() {
      if (this.length === 0) {
        if (this.hasPreviousPage()) {
          return this.getPreviousPage({
            fetch: true
          });
        }
      } else {
        return this.fetch({
          reset: true
        });
      }
    };

    return Topics;

  })(Backbone.PageableCollection);


  /*
  Messages
   */

  window.App.Collections.Messages = (function(_super) {
    __extends(Messages, _super);

    function Messages() {
      return Messages.__super__.constructor.apply(this, arguments);
    }

    Messages.prototype.model = window.App.Models.Message;

    Messages.prototype.initialize = function() {
      this.on('destroy', this.renderMessagesOnDestroy, this);
      this.on('remove', this.fetchMessages, this);
      this.on('error', this.errorHandle, this);
      return this.on('add', this.fetchMessages, this);
    };

    Messages.getCurrentTopicId = function() {
      return $('#topicId').val();
    };

    Messages.prototype.url = '/topic/messages/' + Messages.getCurrentTopicId();

    Messages.prototype.state = {
      pageSize: 5
    };

    Messages.prototype.queryParams = {
      totalPages: null,
      totalRecords: null,
      sortKey: "sort"
    };

    Messages.prototype.parseState = function(resp, queryParams, state, options) {
      return {
        totalRecords: resp.total_page
      };
    };

    Messages.prototype.parseRecords = function(resp, options) {
      return resp.items;
    };

    Messages.prototype.fetchMessages = function() {
      return this.fetch({
        reset: true
      });
    };

    Messages.prototype.errorHandle = function(e, m) {
      return window.location = window.App.getContextPath() + "/index?error=" + m.responseJSON.error.error;
    };

    Messages.prototype.renderMessagesOnDestroy = function() {
      if (this.length === 0) {
        if (this.hasPreviousPage()) {
          return this.getPreviousPage({
            fetch: true
          });
        }
      }
    };

    return Messages;

  })(Backbone.PageableCollection);

}).call(this);
