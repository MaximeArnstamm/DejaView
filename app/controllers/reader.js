import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToDetails() {
      this.transitionToRoute('details', this.get('model.series_title'));
    }
  }
});
