import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return Ember.RSVP.hash({
      books: [
        {
          title: 'Awesome book'
        },
        {
          title: 'Not so good one'
        }
      ]
    });
  },

  setupController: function(controller, models) {
    return controller.setProperties(models);
  }

});
