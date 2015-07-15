import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return Ember.RSVP.hash({
      books: this.store.findAll('book')
    });
  },

  setupController: function(controller, models) {
    return controller.setProperties(models);
  },

  actions: {
    deleteBook: function(book) {
      var _this = this;
      book.destroyRecord().then(function() {
        _this.transitionTo('books');
      });
    },
    updateBook: function(book) {
      var _this = this;
      book.save().then(function(book) {
        _this.transitionTo('books.book', book);
      });
    },
    createBook: function(book) {
      var _this = this;
      this.store.createRecord('book', book).save().then(function(book) {
        _this.transitionTo('books.book', book);
      });
    }
  }

});
