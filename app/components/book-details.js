import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteBook: function() {
      this.sendAction('action', this.get('book'));
    }
  }
});
