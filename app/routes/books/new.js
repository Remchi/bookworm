import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return { title: '', author: '', description: '' };
  },

  setupController: function(controller, model) {
    controller.set('book', model);
  },

  actions: {
    createBook: function(book) {
      var _this = this;
      this.store.createRecord('book', book).save().then(function(book) {
        _this.transitionTo('books.book', book);
      })
    }
  }
});
