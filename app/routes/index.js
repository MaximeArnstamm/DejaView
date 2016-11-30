import Ember from 'ember';

export default Ember.Route.extend({
  seriesService: Ember.inject.service(),
  model() {
    return this.get('seriesService').getAllSeries();
  }
});
