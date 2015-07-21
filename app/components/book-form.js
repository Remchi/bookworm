import Ember from 'ember';
import DS from 'ember-data';
import Validator from 'npm:validator';

export default Ember.Component.extend({
  errors: DS.Errors.create(),

  buttonLabel: function() {
    return (this.get('book').id) ? 'Update Book' : 'Add Book';
  }.property(),

  actions: {
    submit: function() {
      if (this.validate()) {
        this.sendAction('action', this.get('book'));
      }
    }
  },

  validate: function() {
    this.set('errors', DS.Errors.create());

    if (Validator.isNull(this.get('book.title'))) {
      this.get('errors').add('title', "can't be empty");
    }

    if (Validator.isNull(this.get('book.author'))) {
      this.get('errors').add('author', "can't be empty");
    }

    return this.get('errors.isEmpty');
  }
});
