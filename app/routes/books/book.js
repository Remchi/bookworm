import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('book', params.book_id);
  },

  setupController: function(controller, model) {
    controller.set('book', model);
  }
});
