import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    logout: function() {
      this.get('session').invalidate();
    }
  }
});
