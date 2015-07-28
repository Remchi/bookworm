import Ember from 'ember';
import DS from 'ember-data';
import serverErrorsParser from '../../utils/server-errors-parser';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findRecord('book', params.book_id);
  },

  setupController: function(controller, model) {
    controller.set('book', model);
    controller.set('errors', DS.Errors.create());
  },

  actions: {
    updateBook: function(book) {
      var _this = this;
      var errors = _this.controllerFor('books.edit').get('errors');
      book.save().then(function(book) {
        _this.transitionTo('books.book', book);
      }).catch(function(resp) {
        serverErrorsParser(resp, errors);
      });
    }

  }

});
